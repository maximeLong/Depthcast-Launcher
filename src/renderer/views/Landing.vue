<template>
  <div id="landing">
    <!-- launchers -->
    <div class="button-container" @click="launchDepthcast" disabled="depthcastIsOpen" :class="{open : depthcastIsOpen}">
      <div class="button-image main"><div class="icon"></div></div>
      <div class="text">Depthcast Designer</div>
    </div>
    <div class="button-container" @click="launchImporter" disabled="importerIsOpen" :class="{open : importerIsOpen}">
      <div class="button-image model"><div class="icon"></div></div>
      <div class="text">Model Importer</div>
    </div>
    <!-- drag and drop container -->
    <drag-zone></drag-zone>
  </div>
</template>

<script>
import { remote } from 'electron'
import { mapState, mapActions } from 'vuex'
import DragZone from '@/components/DragZone'
export default {
  name: 'landing',
  mounted: function() {
    remote.getCurrentWindow().setMinimumSize(1000, 570);
    remote.getCurrentWindow().setContentSize(1000, 570);
  },
  components: {
    DragZone
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
    +flexbox
    +flex-direction(column)
    +justify-content(center)
    &.open
      opacity: .25
    &.dragged,&.success
      .button-image.vfx
        +transition(.25s ease all)
        border: 2px dashed $action_color
      .drop
        +transition(.25s ease all)
        color: $action_color

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
        +transition(.5s ease all)
        cursor: default
        background: none
        border: 2px dashed $text_color_grey
        .drop
          +transition(.5s ease all)
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
