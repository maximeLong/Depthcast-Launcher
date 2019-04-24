<template>
  <div id="header-panel">
    <div class="member-name">
      <div class="greeting">{{name ? 'hi, ' + name : ''}}</div>
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
import { mapState } from 'vuex'

  export default {
    name: 'headerPanel',
    data () {
      return {}
    },
    computed: mapState({
      name:  state => state.FileSystem.userName.split(' ')[0]
    }),
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
  border-bottom: 2px solid $border_color
  height: 100%
  padding: 0 15px
  +flex-direction(row)
  +align-items(center)
  +justify-content(flex-end)
  +flexbox

  .member-name
    margin-right: 30px

  .controls
    +flexbox
    -webkit-app-region: no-drag
    #minimize
      width: 20px
      height: 20px
      border-bottom: 3px solid $text_color_grey
      +clickable
      margin-right: 10px
    #close
      width: 20px
      height: 20px
      background-color: $text_color_grey
      border-radius: 2px
      +clickable
      +flexbox
      +align-items(center)
      +justify-content(center)
      font-size: 10px
      color: black
      font-weight: 700

</style>
