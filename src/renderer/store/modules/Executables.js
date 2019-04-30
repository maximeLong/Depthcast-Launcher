import { remote, ipcRenderer } from 'electron'
const child   = require('child_process').execFile;
var extract   = require('extract-zip');
var AdmZip    = require('adm-zip');
var request   = require('request');


const state = {
  needsInstallation:  false,
  autoInstall:        false,
  depthcastPath:      undefined,
  importerPath:       undefined,

  depthcastIsOpen:    false,
  importerIsOpen:     false,

  userName:           '',
  formKey:            '',
  downloadError:      '',
  downloadStatus:     '',

  launcherVersion:    '0.0.0',
  latestVersion:      '0.0.0',
  latestVersionNotes: '',
  needsUpdate:        false,
  latestVersionDownloadUrl: ''
}

const mutations = {
  SET_NEEDS_INSTALLATION (state, val) {
    state.needsInstallation = val;
  },
  SET_AUTO_INSTALL (state, val) {
    state.autoInstall = val;
  },
  SET_DEPTHCAST_PATH (state, val) {
    state.depthcastPath = val;
  },
  SET_IMPORTER_PATH (state, val) {
    state.importerPath = val;
  },

  TOGGLE_DEPTHCAST_IS_OPEN (state, val) {
    state.depthcastIsOpen = val;
  },
  TOGGLE_IMPORTER_IS_OPEN (state, val) {
    state.importerIsOpen = val;
  },

  UPDATE_USER_NAME (state, val) {
    state.userName = val;
  },
  UPDATE_FORM_KEY (state, val) {
    state.formKey = val;
  },
  UPDATE_DOWNLOAD_ERROR (state, val) {
    state.downloadError = val;
  },
  UPDATE_DOWNLOAD_STATUS (state, val) {
    state.downloadStatus = val;
  },

  SET_LAUNCHER_VERSION (state, val) {
    state.launcherVersion = val;
  },
  SET_LATEST_VERSION (state, val) {
    state.latestVersion = val;
  },
  SET_LATEST_VERSION_NOTES (state, val) {
    state.latestVersionNotes = val;
  },
  SET_NEEDS_UPDATE (state, val) {
    state.needsUpdate = val;
  },
  SET_LATEST_VERSION_DOWNLOAD_URL (state, val) {
    state.latestVersionDownloadUrl = val;
  }
}

const actions = {
  //launchers
  //
  launchImporter({commit, state}) {
    commit('TOGGLE_IMPORTER_IS_OPEN', true);
    child(state.depthcastPath, (err, data)=> {
      err ? console.log(err) : console.log(data.toString());
      commit('TOGGLE_IMPORTER_IS_OPEN', false);
    });
  },
  launchDepthcast({commit, state}) {
    commit('TOGGLE_DEPTHCAST_IS_OPEN', true);
    child(state.importerPath, (err, data)=> {
      err ? console.log(err) : console.log(data.toString());
      commit('TOGGLE_DEPTHCAST_IS_OPEN', false);
    });
  },

  // download and unpack flow
  //
  getExeAndUnpack({commit, state}) {
    return new Promise((resolve, reject) => {
      //retrieve download URL from server >> using key as input
      commit('UPDATE_DOWNLOAD_STATUS', 'Verifying Product Key...');

      var serverEndpoint = "https://us-central1-depthcast-designer.cloudfunctions.net/depthcastApi/getExeDownloadUrl";
      fetch(serverEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({key: state.formKey, version: state.launcherVersion})
      }).then((res)=> {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      }).then((jsonRes)=> {
        //store returned variables to localstorage
        commit('UPDATE_DOWNLOAD_STATUS', 'Key verified. Downloading and unpacking executables...');

        console.log(jsonRes);
        localStorage.setItem('key', jsonRes.key);
        localStorage.setItem('email', jsonRes.email);
        localStorage.setItem('name', jsonRes.name);

        fetchAndExtract(jsonRes.download_url).then(()=> {
          //clear state and tell update component we are all good
          commit('UPDATE_DOWNLOAD_ERROR', '');
          resolve(); //success
        }).catch((err)=> {
            commit('UPDATE_DOWNLOAD_ERROR', 'Your key was correct, but we could not download your executables. Check your internet connection and try again.');
            reject();
        })
      }).catch((err)=> {
        console.log('couldnt connect or verify key ', err);
        commit('UPDATE_DOWNLOAD_ERROR', 'Could not verify Product Key. Check your key and internet connection and try again.');
        reject();
      });

    })
  },

  // check for updates
  //
  checkForUpdates({commit, state}) {
    fetch("https://api.github.com/repos/maximeLong/Depthcast-Launcher/releases/latest").then((res)=> {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    }).then((jsonRes)=> {
      console.log(jsonRes);

      commit('SET_LATEST_VERSION', jsonRes.tag_name);
      commit('SET_LATEST_VERSION_NOTES', jsonRes.body);
      commit('SET_LATEST_VERSION_DOWNLOAD_URL', jsonRes.assets[0].browser_download_url)

      if (jsonRes.tag_name === 'v' + state.launcherVersion) {
        commit('SET_NEEDS_UPDATE', false);
      } else {
        commit('SET_NEEDS_UPDATE', true);
      }
      //override
      commit('SET_NEEDS_UPDATE', true);

    }).catch((err)=> {
      console.log("couldn't get version info, check internet connection..")
      commit('SET_NEEDS_UPDATE', false);
    })
  },

  // download new update
  //
  downloadUpdate({commit, state}) {
    return new Promise((resolve, reject)=> {
      //tell main to download
      ipcRenderer.send('download-object', {url: state.latestVersionDownloadUrl});
      //on finish resolve promise
      ipcRenderer.on('download-success', (event, arg) => {
        //shell.openItem(remote.app.getPath('downloads'))
        resolve()
      })
    })
  }
}

// unzip helper
const fetchAndExtract = function(downloadUrl) {
  return new Promise((resolve, reject)=> {
    request.get({url: downloadUrl, encoding: null}, (err, res, body) => {
      if (!err) {
        var zip         = new AdmZip(body);
        var zipEntries  = zip.getEntries();
        console.log("unpacking " + zipEntries.length + " files to: " + remote.app.getPath('userData'));
        zip.extractAllTo(remote.app.getPath('userData'), true);
        resolve();
      } else {
        console.log("something went wrong with download: ", err);
        reject(err);
      }
    });
  });
}

export default {
  state,
  mutations,
  actions
}
