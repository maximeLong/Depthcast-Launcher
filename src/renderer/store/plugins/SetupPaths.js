import { remote } from 'electron'
var fs        = require('fs');
var mkdirp    = require('mkdirp');
const homeDir = require('os').homedir();


const setupPaths = store => {

  //rewrite the userData path + make it if it doesnt exist
  remote.app.setPath('userData', homeDir + '\\AppData\\Local\\Depthcast');
  mkdirp(remote.app.getPath('userData'), function (err) {
    err ? console.error(err) : console.log('made dir');
  });
  store.commit('SET_DEPTHCAST_PATH', remote.app.getPath('userData') + "\\Depthcast\\Depthcast.exe")
  store.commit('SET_IMPORTER_PATH', remote.app.getPath('userData') + "\\Depthcast\\Depthcast.exe")

  //check we need to start installation process
  try {
    fs.statSync(remote.app.getPath('userData') + '\\Depthcast');
    store.commit('SET_NEEDS_INSTALLATION', false);
  } catch (err) {
    if (err.code === 'ENOENT') {
        store.commit('SET_NEEDS_INSTALLATION', true);
    }
  }

  //check if we have localStorage items
  store.commit('UPDATE_FORM_KEY',   localStorage.getItem('key'));
  store.commit('UPDATE_USER_EMAIL', localStorage.getItem('email'));
  store.commit('UPDATE_USER_NAME',  localStorage.getItem('name'));

}

export default setupPaths;
