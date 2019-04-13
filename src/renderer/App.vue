<template>
  <div id="app">

    <div id="side-panel-container">
      <side-panel></side-panel>
    </div>

    <div id="content-container">
      <div id="header-panel-container">
        <header-panel></header-panel>
      </div>
      <div id="view-container">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import HeaderPanel  from './components/HeaderPanel';
  import SidePanel    from './components/SidePanel';

  export default {
    name: 'depthcast-native',
    components: {
      HeaderPanel,
      SidePanel
    }
  }
</script>

<style lang="sass">
@import src/renderer/styles/main


</style>
