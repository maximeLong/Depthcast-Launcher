<template>
  <div id="footer-panel">
    <div class="fps">
      <div class="title">Engine: {{engineFPS}}</div>
    </div>
    <div class="fps">
      <div class="title">Camera: {{cameraFPS}}</div>
    </div>
  </div>
</template>

<script>
  const storage = window.localStorage;
  import {io} from '../store/plugins/serverSetup'

  export default {
    name: 'footerPanel',
    data () {
      return {}
    },
    mounted: function() {},
    methods: {},
    computed: {
      engineFPS: function() {return this.$store.state.UnitySockets.engineFPS },
      cameraFPS: function() {return this.$store.state.UnitySockets.cameraFPS }
    }
  }
</script>

<style lang="sass">
@import src/renderer/styles/main

#footer-panel
  color: #b5b5b5
  border-top: 1px solid #4c4c4c
  font-size: 10px


</style>
