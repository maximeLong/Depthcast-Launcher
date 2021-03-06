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
  store.commit('SET_DEPTHCAST_PATH', remote.app.getPath('userData') + "\\Executables\\Designer\\Depthcast.exe")
  store.commit('SET_IMPORTER_PATH', remote.app.getPath('userData') + "\\Executables\\Model_Importer\\Importer.exe")

  //check we need to start installation process
  try {
    fs.statSync(remote.app.getPath('userData') + '\\Executables');
    store.commit('SET_NEEDS_INSTALLATION', false);
  } catch (err) {
    if (err.code === 'ENOENT') {
        store.commit('SET_NEEDS_INSTALLATION', true);
        //if key exists then this is an update (thus auto install)
        if (localStorage.getItem('key')) {
          store.commit('SET_AUTO_INSTALL', true);
        }
    }
  }

  //check if user is online
  store.dispatch('checkForOnlineConnection');
  //check for updates (this might need to moved to online or installation callback)
  store.dispatch('checkForUpdates');
}

export default setupIO;
