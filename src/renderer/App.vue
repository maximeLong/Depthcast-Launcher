<template>
  <div id="app">

    <header-panel></header-panel>

    <div id="app-content">
      <router-view></router-view>
    </div>

    <footer-panel></footer-panel>

  </div>
</template>

<script>
  import HeaderPanel from './components/HeaderPanel';
  import FooterPanel from './components/FooterPanel'

  export default {
    name: 'depthcast-native',
    components: {
      HeaderPanel,
      FooterPanel
    }
  }
</script>

<style lang="sass">
@import src/renderer/styles/main


</style>
