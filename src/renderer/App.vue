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

      <toast></toast>
    </div>

  </div>
</template>

<script>
  import HeaderPanel  from './components/HeaderPanel';
  import SidePanel    from './components/SidePanel';
  import Toast        from './components/Toast';

  export default {
    name: 'launcher-main',
    components: {
      HeaderPanel,
      SidePanel,
      Toast
    },
  }
</script>

<style lang="sass">
@import src/renderer/styles/main


</style>
