<template>
  <div id="header-panel">
    <div class="title">
      <div class="logo"></div>
      <div class="name">Depthcast - Version: 0.0.1</div>
    </div>
    <div class="controls">
      <div id="minimize" @click="minimizeApp"></div>
      <div id="close" @click="closeApp">
        <i class="material-icons">close</i>
      </div>
    </div>
  </div>
</template>

<script>
const { remote } = require('electron')

  export default {
    name: 'headerPanel',
    data () {
      return {}
    },
    methods: {
      closeApp: function() {
        remote.BrowserWindow.getFocusedWindow().close();
      },
      minimizeApp: function() {
        remote.BrowserWindow.getFocusedWindow().minimize();
      }
    }
  }
</script>

<style lang="sass">
@import src/renderer/styles/main

#header-panel
  -webkit-app-region: drag
  color: white
  border-bottom: 4px solid $action_color
  font-size: 10px

  .title
    +flexbox
    +align-items(center)
    height: 100%
    .logo
      margin-right: 10px
      width: 25px
      height: 25px
      background-size: contain
      background-position: 50% 50%
      background-repeat: no-repeat
      background-image: url('../assets/logo-thumb.png')

  .controls
    +flexbox
    -webkit-app-region: no-drag

    #minimize
      width: 15px
      height: 15px
      border-bottom: 3px solid #919191
      +clickable
      margin-right: 10px
    #close
      width: 15px
      height: 15px
      background-color: #919191
      border-radius: 2px
      +clickable
      +flexbox
      +align-items(center)
      +justify-content(center)
      font-size: 10px
      color: #1d1d1d
      font-weight: bold

</style>
