import { remote } from 'electron'
const child   = require('child_process').execFile;
const homeDir = require('os').homedir();
var extract   = require('extract-zip');

const state = {
  needsInstallation:  false,
  depthcastIsOpen:    false,
  importerIsOpen:     false,
  depthcastPath:      undefined,
  importerPath:       undefined
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
  }
}

const actions = {
  launchImporter({commit, state}) {
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
    //retrieve exe and unpack
      const zipSource = homeDir + '\\Desktop\\Depthcast.zip';
      extract(zipSource, {dir: remote.app.getPath('userData')}, function (err) {
        if (err) {
          console.error(err)
          reject();
        } else {
          console.log('extracted');
          commit('SET_NEEDS_INSTALLATION', false);
          resolve();
        }
      })
    })
  }


}

export default {
  state,
  mutations,
  actions
}
