<template>
  <div id="options-panel">

    <div class="good">
      <div id="scan-btn" @click="sendPing('scanRoom')">Scan Room</div>
      <div class="twitch-input">
        <div class="title">Twitch:</div>
        <input id="twitch-info" placeholder="channel name" :value="twitchInfo" @input="updateTwitchInfo">
      </div>
    </div>

    <div class="bad">
      <div id="fix-btn" @click="sendPing('fixControllers')">Fix controllers</div>
    </div>
  </div>
</template>

<script>
  const storage = window.localStorage;
  import {io} from '../store/plugins/serverSetup'

  export default {
    name: 'optionsPanel',
    data () {
      return {}
    },
    mounted: function() {
      //send twitch info on socket connection
      io.on("connection", (socket)=> {
        this.sendString('twitchChannel', storage.getItem("twitch"))
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
    #scan-btn
      height: 30px
      padding: 0 10px
      +button
    .twitch-input
      margin-left: 15px
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
      opacity: .5


</style>
