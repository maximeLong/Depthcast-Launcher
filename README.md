# depthcast-launcher

> Windows launcher for Depthcast

#### Build Setup

``` bash
# install dependencies
make sure you have installed the latest version of node and windows build tools:
https://github.com/felixrieseberg/npm-windows-upgrade
https://github.com/felixrieseberg/windows-build-tools
also install yarn if you havent already

# install dependencies
yarn

# start the build
yarn run dev


# to build
put depthcast build data in 'depthcast' folder under static
put calibration data in 'zed_calibration' folder under static

under PlayerSettings change name to  `Depthcast` & Build .. drop contents into 'depthcast' folder in static

at root, run 'npm run build'
build data will be in 'build' folder
```

---
