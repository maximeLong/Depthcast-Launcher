<template>
  <div id="landing">
    <div class="button-container" @click="launchDepthcast" disabled="depthcastIsOpen" :class="{open : depthcastIsOpen}">
      <div class="button-image main"><div class="icon"></div></div>
      <div class="text">Depthcast Designer</div>
    </div>
    <div class="button-container" @click="launchImporter" disabled="importerIsOpen" :class="{open : importerIsOpen}">
      <div class="button-image model"><div class="icon"></div></div>
      <div class="text">Model Importer</div>
    </div>
    <div class="button-container">
      <div class="button-image vfx"><div class="drop">Drop .assetbundle files</div></div>
      <div class="text">Unity VFX Importer</div>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'landing',
  mounted: function() {
    remote.getCurrentWindow().setMinimumSize(1000, 570);
    remote.getCurrentWindow().setContentSize(1000, 570);
  },
  data() {
    return {}
  },
  computed: mapState({
    depthcastIsOpen:    state => state.Executables.depthcastIsOpen,
    importerIsOpen:     state => state.Executables.importerIsOpen
  }),
  methods: {
    ...mapActions([
      'launchDepthcast',
      'launchImporter'
    ])
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
    &.open
      opacity: .25
    .button-image
      width: 100%
      height: 150px
      background: $background_gradient
      +flexbox
      +align-items(center)
      +justify-content(center)
      +clickable
      &.main
        .icon
          background-image: url('../assets/Logo_Front.png')
      &.model
        .icon
          background-image: url('../assets/Model_Front.png')
      &.vfx
        background: none
        border: 2px dashed $text_color_grey
        .drop
          padding: 0 20px
      .icon
        width: 80%
        height: 80%
        background-size: contain
        background-position: 50% 50%
        background-repeat: no-repeat

    .text
      +largeText
      padding: 15px 0 0 10px

</style>
