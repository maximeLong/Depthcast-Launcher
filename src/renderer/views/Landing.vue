<template>
  <div id="landing">
    <div class="button-container">
      <div class="button-image main"></div>
      <div class="text">Depthcast Designer</div>
    </div>
    <div class="button-container">
      <div class="button-image model"></div>
      <div class="text">Model Importer</div>
    </div>
    <div class="button-container">
      <div class="button-image vfx"></div>
      <div class="text">Unity VFX Importer</div>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
const child = require('child_process').execFile;
const fs    = require('fs');
const path  = require('path');

export default {
  name: 'landing',
  data() {
    return {
      importerIsOpen: false,
      depthcastIsOpen: false,
      calibrateExecutablePath: path.join(__static, 'zed_calibration/Calibration.exe'),
      depthcastExecutablePath: remote.app.getPath('Desktop') + "\\Depthcast\\Depthcast.exe"
    }
  },
  methods: {
    launchImporter: function() {
      this.importerIsOpen = true;
      child(this.calibrateExecutablePath, (err, data)=> {
        this.importerIsOpen = false;
        err ? console.log(err) : console.log(data.toString());
      });
    },

    launchDepthcast: function() {
      var exePath = remote.app.getPath('desktop') + "\\Depthcast\\Depthcast.exe";
      child(exePath, (err, data)=> {
        this.depthcastIsOpen = false;
        err ? console.log(err) : console.log(data.toString());
      });
    }
  }

}
</script>

<style lang="sass">
@import src/renderer/styles/main

#landing
  width: 100%
  height: 100%
  +flexbox
  +flex-direction(row)
  +align-items(center)
  +justify-content(space-between)
  padding: 0 70px

  .button-container
    width: 150px
    height: 100%
    +flexbox
    +flex-direction(column)
    +justify-content(center)
    .button-image
      width: 100%
      height: 150px
      background: $background_gradient
      +clickable
    .text
      +largeText
      padding: 15px 0 0 10px

</style>
