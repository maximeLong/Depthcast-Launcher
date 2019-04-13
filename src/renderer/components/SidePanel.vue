<template>
  <div id="side-panel">

    <div class="logo-bar panel">
      <div class="icon logo"></div>
      <div class="button">Depthcast</div>
    </div>

    <div class="additional-panel">
      <div class="panel">
        <div class="icon update"></div>
        <div class="button">Updates</div>
      </div>
      <div class="panel">
        <div class="icon discord"></div>
        <div class="button">Discord channel</div>
      </div>
    </div>

  </div>
</template>

<script>
const { remote } = require('electron')
export default {
  name: 'sidePanel',
  data () {
    return {}
  },
  methods: {

  }
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
    .button
      +clickable
      margin-left: 10px


  .logo-bar
    height: 50px
    .logo
      width: 35px
      height: 35px
      background-image: url('../assets/logo.svg')
    .button
      margin-left: 5px
      color: $text_color_white
      letter-spacing: .75px
  .additional-panel
    margin-bottom: 20px
    .panel:nth-of-type(1)
      margin-bottom: 8px


</style>
