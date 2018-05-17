<template>
  <div id="options-panel">

    <div class="good">
      <div id="camera-btn" @click="sendPing('startCamera')">Start Zed</div>

      <div v-if="!alreadyScanned" id="scan-btn" @click="sendPing('scanRoom')">{{scanning ? 'Stop Scanning' : 'Scan Room'}}</div>
      <div v-else id="scan-btn" @click="sendPing('scanRoom')">{{scanning ? 'Stop Scanning' : 'Re-Scan Room'}}</div>

      <div class="twitch-input">
        <div class="title">Twitch:</div>
        <input id="twitch-info" placeholder="channel name" :value="twitchInfo" @input="updateTwitchInfo">
      </div>
    </div>

    <div class="bad">
      <div id="fix-btn" @click="sendPing('fixControllers')">Re-calibrate Pads</div>
    </div>
  </div>
</template>

<script>
  const storage = window.localStorage;
  import {io} from '../store/plugins/serverSetup'

  export default {
    name: 'optionsPanel',
    data () {
      return {
        scanning: false,
        alreadyScanned: false
      }
    },
    mounted: function() {
      //send twitch info on socket connection, set up scanning logic
      io.on("connection", (socket)=> {
        this.sendString('twitchChannel', storage.getItem("twitch"))

        //handle the scanning UI
        this.alreadyScanned = false //reset for editor
        // socket.on('fromDepthcast', (data, value)=> {
        //   if (data == 'scanRoom') {
        //     if (value == 'scanningStarted') {
        //       this.scanning = true
        //       if (!this.alreadyScanned) { this.alreadyScanned = true }
        //     } else {
        //       this.scanning = false
        //     }
        //   }
        // });
      })
    },
    methods: {
      updateTwitchInfo: function(e) {
        storage.setItem('twitch', e.target.value);
        this.sendString('twitchChannel', e.target.value)
      },
      sendString: function(keyword, string) {
        io.emit('toDepthcastString', keyword, string);
      },
      sendPing: function(keyword) {
        io.emit('toDepthcastPing', keyword);
        //TODO: hack -- fix for real
        if (!this.scanning) {
          this.scanning = true
          if (!this.alreadyScanned) {this.alreadyScanned = true}
        } else {
          this.scanning = false
        }
      }
    },
    computed: {
      twitchInfo: function() {
        return storage.getItem("twitch");
      }
    }
  }
</script>

<style lang="sass">
@import src/renderer/styles/main

#options-panel
  color: #b5b5b5
  border-top: 1px solid #4c4c4c
  font-size: 10px
  .good
    +flexbox
    +align-items(center)
    margin-right: 15px
    #camera-btn
      height: 30px
      padding: 0 10px
      +button
    #scan-btn
      height: 30px
      padding: 0 10px
      margin: 0 10px
      +button
      &.done
        opacity: .5
        cursor: default
    .twitch-input
      +flexbox
      +align-items(center)
      input
        margin-left: 5px
        height: 20px
  .bad
    border-left: 1px solid #4c4c4c
    padding-left: 15px
    height: 100%
    +flexbox
    +align-items(center)
    #fix-btn
      +button
      height: 30px
      padding: 0 10px


</style>
