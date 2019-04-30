<template>
  <div id="side-panel">

    <div class="logo-bar panel">
      <div class="icon logo"></div>
      <div class="button">Depthcast <span>{{launcherVersion}}</span></div>
    </div>


    <div class="additional-panel">
      <router-link to="/" :disabled="needsInstallation">
        <div class="panel" :class="{ 'disabled' : needsInstallation }">
          <div class="icon home"></div>
          <div class="button">Home</div>
        </div>
      </router-link>
      <router-link to="/update">
        <div class="panel">
          <div class="icon update"></div>
          <div class="button">Updates</div>
          <div class="notification" v-if="needsUpdate"></div>
        </div>
      </router-link>
      <router-link to="/discord">
        <div class="panel">
          <div class="icon discord"></div>
          <div class="button">In-app chat</div>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
const   { remote }    = require('electron')
import  { mapState }  from 'vuex'

export default {
  name: 'sidePanel',
  data () {
    return {}
  },
  computed: mapState({
    needsInstallation: state => state.Executables.needsInstallation,
    needsUpdate: state => state.Executables.needsUpdate,
    launcherVersion: state => state.Executables.launcherVersion
  })
}
</script>

<style lang="sass">
@import src/renderer/styles/main

#side-panel
  border-right: 2px solid $border_color
  padding: 0 15px
  height: 100%
  width: 100%
  +flexbox
  +flex-direction(column)
  +align-content(center)
  +justify-content(space-between)

  .panel
    +flexbox
    +flex-direction(row)
    +align-items(center)
    width: 100%
    .icon
      width: 30px
      height: 30px
      background-size: contain
      background-position: 50% 50%
      background-repeat: no-repeat
      &.discord
        background-image: url('../assets/discord.svg')
      &.update
        background-image: url('../assets/update.svg')
      &.home
        background-image: url('../assets/home.svg')
    .button
      +clickable
      margin-left: 10px
    .notification
      margin-left: 10px
      height: 10px
      width: 10px
      border-radius: 20px
      background-color: #79a8ff

    &.disabled
      .icon
        opacity: .35
      .button
        opacity: .5
        cursor: default


  .logo-bar
    height: 50px
    .logo
      width: 35px
      height: 35px
      background-image: url('../assets/logo.svg')
    .button
      cursor: default
      margin-left: 5px
      color: $text_color_white
      letter-spacing: .75px
      span
        margin-left: 5px
        font-size: 13px
        color: $text_color_grey

  .additional-panel
    margin-bottom: 20px
    a
      color: $text_color_grey
      &.router-link-exact-active
        color: $action_color
      &[disabled]
        cursor: default
    .panel
      margin-bottom: 8px
    .panel:last-of-type
      margin-bottom: 0


</style>
