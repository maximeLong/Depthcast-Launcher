import { remote } from 'electron'
var fs        = require('fs');
var mkdirp    = require('mkdirp');
const homeDir = require('os').homedir();


const setupIO = store => {

  //set version -- if dev set from package json
  if (process.env.NODE_ENV == 'development') {
    store.commit('SET_LAUNCHER_VERSION', require('../../../../package.json').version);
  } else {
    store.commit('SET_LAUNCHER_VERSION', remote.app.getVersion());
  }

  //check if we have localStorage items
  store.commit('UPDATE_FORM_KEY',   localStorage.getItem('key'));
  store.commit('UPDATE_USER_NAME',  localStorage.getItem('name'));

  //set the executable paths >> if this causes errors we can move this into installation flow
  store.commit('SET_DEPTHCAST_PATH', remote.app.getPath('userData') + "\\Depthcast\\Depthcast.exe")
  store.commit('SET_IMPORTER_PATH', remote.app.getPath('userData') + "\\Depthcast\\Depthcast.exe")

  //check we need to start installation process
  try {
    fs.statSync(remote.app.getPath('userData') + '\\Depthcast');
    store.commit('SET_NEEDS_INSTALLATION', false);
  } catch (err) {
    if (err.code === 'ENOENT') {

        store.commit('SET_NEEDS_INSTALLATION', true);

        //if key is present then we can assume that this is an update (installer deletes old Directory)
        if (store.state.formKey !== null) {
          store.commit('SET_AUTO_INSTALL', true);
        }
    }
  }


  //check for updates >> might also want to move this into installation callback
  store.dispatch('checkForUpdates');

  //
}

export default setupIO;
