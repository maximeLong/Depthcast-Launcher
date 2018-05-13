<template>
  <div id="landing">

    <div class="launchers">
      <div class="calibrate btn-group" :class="{ completed : calibrated }">
        <div class="done"><i class="material-icons" v-if="calibrated">check</i></div>
        <div class="launch-button" id="launch-calibrate" @click="launchCalibration">{{calibrated ? "Re-calibrate" : "Calibrate"}} Depth</div>
      </div>

      <div class="app btn-group" :class="{ notavailable : !calibrated || depthcastIsOpen }">
        <div class="launch-button" id="launch-app" @click="launchDepthcast">Launch Depthcast</div>
      </div>
    </div>

    <transition name="fadeup">
      <div class="panel" v-if="depthcastIsOpen">
        <options-panel></options-panel>
      </div>
    </transition>

  </div>
</template>

<script>
  import OptionsPanel from '../components/OptionsPanel';

  import { remote } from 'electron'
  const child = require('child_process').execFile;
  const fs = require('fs');
  const path = require('path');
  import {io} from '../store/plugins/serverSetup'

  export default {
    name: 'landing',
    components: {
      OptionsPanel
    },
    mounted: function() {
      this.checkCalibration();
      io.on("connection", (socket)=> {
        this.depthcastIsOpen = true;
      })
    },
    computed: {},
    methods: {
      checkCalibration: function() {
        if (fs.existsSync(this.calibrateDataPath)) {
          this.calibrated = true;
          fs.readFile(this.calibrateDataPath, 'utf8', (err,data)=> {
            if (err) { console.log(err) }
            else { console.log(data) }
          });
        }
        else { this.calibrated = false; }
      },
      launchCalibration: function() {
        this.calibrateIsOpen = true;
        child(this.calibrateExecutablePath, (err, data)=> {
          this.calibrateIsOpen = false;
          if(err) { console.error(err) }
          else {
            console.log(data.toString())
          }
        });
      },

      launchDepthcast: function() {
        if (!this.calibrated || this.depthcastIsOpen) {
          return //mirror on css
        } else {
          child(this.depthcastExecutablePath, (err, data)=> {
            this.depthcastIsOpen = false;
            if(err) { console.error(err) }
            else {
              console.log(data.toString())
            }
          });
        }
      }

    },
    data() {
      return {
        calibrated: false,
        calibrateIsOpen: false,
        depthcastIsOpen: false,
        calibrateExecutablePath: path.join(__static, 'zed_calibration/Calibration.exe'),
        depthcastExecutablePath: path.join(__static, 'depthcast/depthcast.exe'),
        calibrateDataPath: remote.app.getPath("home") + "\\AppData\\Roaming\\Stereolabs\\steamvr\\Zed_Position_Offset.conf"
      }
    }
  }
</script>

<style lang="sass">
@import src/renderer/styles/main

#landing
  width: 100%
  height: 100%
  .launchers
    width: 100%
    height: calc(100% - 50px)
    +flexbox
    +flex-direction(column)
    +justify-content(center)
    +align-items(center)

    .btn-group
      margin-bottom: 10px
    .launch-button
      width: 200px
      height: 45px
      +button
    .notavailable
      opacity: 0.1
      .launch-button
        cursor: default
    .completed .launch-button
      border: 2px solid $action_color
      color: $action_color
      background-color: transparent

    .calibrate,.scan
      +flexbox
      +align-items(center)
      margin-left: -45px
      .done
        width: 25px
        height: 25px
        border-radius: 100%
        border: 2px solid $action_color
        margin-right: 20px
        +flexbox
        +align-items(center)
        +justify-content(center)
        color: $action_color

</style>
