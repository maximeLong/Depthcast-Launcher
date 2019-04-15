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

  //check we need to start installation process
  try {
    fs.statSync(remote.app.getPath('userData') + '\\Depthcast');
    store.commit('SET_NEEDS_INSTALLATION', false);
  } catch (err) {
    if (err.code === 'ENOENT') {
        store.commit('SET_NEEDS_INSTALLATION', true);
    }
  }

}

export default setupPaths;
