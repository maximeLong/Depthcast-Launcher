<template>
  <div id="landing">

    <div class="launchers">
      <div class="calibrate btn-group" :class="{ completed : calibrated }">
        <div class="done"><i class="material-icons" v-if="calibrated">check</i></div>
        <div class="launch-button" id="launch-calibrate" @click="launchCalibration">{{calibrated ? "Re-calibrate" : "Calibrate"}} Depth</div>
      </div>

      <div class="app btn-group" :class="{ notavailable : !calibrated }">
        <div class="launch-button" id="launch-app">Launch Depthcast</div>
      </div>
    </div>

    <div class="panel" v-if="depthcastIsOpen">
      <options-panel></options-panel>
    </div>

  </div>
</template>

<script>
  import OptionsPanel from '../components/OptionsPanel';
  const child = require('child_process').execFile;
  const fs = require('fs');

  export default {
    name: 'landing',
    components: {
      OptionsPanel
    },
    mounted: function() {
      this.checkCalibration();
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
        child(this.calibrateExecutablePath, (err, data)=> {
          if(err) { console.error(err) }
          else {
            this.calibrateIsOpen = true;
            console.log(data.toString())
          }
        });
      }

    },
    data() {
      return {
        calibrated: false,
        calibrateIsOpen: false,
        depthcastIsOpen: true,
        calibrateExecutablePath: "static\\zed_calibration\\Calibration.exe",
        calibrateDataPath: "C:\\Users\\longm\\AppData\\Roaming\\Stereolabs\\steamvr\\Zed_Position_Offset.conf"
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
