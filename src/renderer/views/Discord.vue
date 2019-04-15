<template>
  <div id="discord">
    <webview src="https://discord.gg/Bfe6yr" class="view"></webview>
  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  name: 'discord',
  data() {
    return {}
  },
  mounted: function() {
    remote.getCurrentWindow().setMinimumSize(1300, 750);
    remote.getCurrentWindow().setContentSize(1300, 750);
  },
  methods: {}

}
</script>

<style lang="sass">
@import src/renderer/styles/main
#discord
  width: 100%
  height: 100%
  .view
    width: 100%
    height: 100%


</style>
