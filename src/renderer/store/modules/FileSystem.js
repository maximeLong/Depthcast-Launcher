import { remote } from 'electron'
const child   = require('child_process').execFile;
const homeDir = require('os').homedir();
var extract   = require('extract-zip');

var AdmZip    = require('adm-zip');
var request   = require('request');


const state = {
  needsInstallation:  false,
  depthcastIsOpen:    false,
  importerIsOpen:     false,
  depthcastPath:      undefined,
  importerPath:       undefined,
  userEmail:          '',
  userName:           '',
  formKey:            '',
  downloadError:      '',
  downloadStatus:     ''
}

const mutations = {
  SET_NEEDS_INSTALLATION (state, val) {
    state.needsInstallation = val;
  },
  TOGGLE_DEPTHCAST_IS_OPEN (state, val) {
    state.depthcastIsOpen = val;
  },
  TOGGLE_IMPORTER_IS_OPEN (state, val) {
    state.importerIsOpen = val;
  },
  SET_DEPTHCAST_PATH (state, val) {
    state.depthcastPath = val;
  },
  SET_IMPORTER_PATH (state, val) {
    state.importerPath = val;
  },
  UPDATE_USER_EMAIL (state, val) {
    state.userEmail = val;
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
  }
}

const actions = {
  launchImporter({commit, state}) {
    console.log(state.depthcastPath);
    child(state.depthcastPath, (err, data)=> {
      err ? console.log(err) : console.log(data.toString());
    });
  },
  launchDepthcast({commit, state}) {
    child(state.importerPath, (err, data)=> {
      err ? console.log(err) : console.log(data.toString());
    });
  },

  getExeAndUnpack({commit, state}) {
    return new Promise((resolve, reject) => {

      commit('UPDATE_DOWNLOAD_STATUS', 'Verifying Product Key...');

      //retrieve download URL from server >> using key as input
      var serverEndpoint = "https://us-central1-depthcast-designer.cloudfunctions.net/depthcastApi/getReleaseUrl";
      fetch(serverEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({key: state.formKey, version: 'v1_01'})
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
  }
}

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
