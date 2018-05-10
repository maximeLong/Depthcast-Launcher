<template>
  <div id="footer-panel">
    <div class="fps">
        <div class="title">Scene FPS: {{DepthcastFPS}}</div>
        <div id="fps-info"></div>
      </div>
  </div>
</template>

<script>
  const storage = window.localStorage;

  export default {
    name: 'footerPanel',
    data () {
      return {
        DepthcastFPS: undefined
      }
    },
    methods: {},
    computed: {}
  }
</script>

<style lang="sass">
@import src/renderer/styles/main

#footer-panel
  color: #b5b5b5
  border-top: 1px solid #4c4c4c
  font-size: 10px


</style>
