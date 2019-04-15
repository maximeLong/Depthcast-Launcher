<template>
  <div id="update">

    <!-- handle installation -->
    <div class="installation" v-if="needsInstallation">

      <div class="info" v-if="!showLoading">
        <div class="title">Depthcast Installation</div>
        <div class="subtitle">It looks like Depthcast's executables haven't been created yet. Let's install them.</div>
      </div>
      <div class="install-form" v-if="!showLoading">
        <div class="subtitle">Enter your product serial key:</div>
        <input class="serial-key" placeholder="Your serial key">
        <div class="submit-button" @click="submitForInstallation">Submit Key</div>
      </div>

      <div class="loading" v-if="showLoading">
        <div class="subtitle">Please wait while your files are being prepared...</div>
        <scale-loader :loading="needsInstallation" :color="'#c3c3c3'"></scale-loader>
      </div>
    </div>

    <!-- handle updates -->
    <div class="everything-is-good" v-if="!needsInstallation">
      <div class="subtitle">You're completely up to date!</div>
        <router-link to="/">Go to launcher</router-link>
    </div>

  </div>
</template>

<script>
import { remote }   from 'electron'
import { mapState, mapActions } from 'vuex'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'


export default {
  name: 'update',
  mounted: function() {
    remote.getCurrentWindow().setMinimumSize(1000, 570);
    remote.getCurrentWindow().setContentSize(1000, 570);
  },
  data() {
    return {
      showLoading: false
    }
  },
  components: {
    ScaleLoader
  },
  computed: mapState({
    needsInstallation: state => state.FileSystem.needsInstallation
  }),
  methods: {
    submitForInstallation() {
      this.showLoading = true;
      this.getExeAndUnpack().then(()=> {
        this.showLoading = true;

      });
    },
    ...mapActions([
      'getExeAndUnpack'
    ])
  }

}
</script>

<style lang="sass">
@import src/renderer/styles/main

#update
  width: 100%
  height: 100%
  .installation
    width: 100%
    height: 100%
    +flexbox
    +flex-direction(row)
    +align-items(center)
    padding: 0 50px
    .info
      +flex(1)
      .title
        +headerText
        margin-bottom: 10px
    .install-form
      +flex(1)
      margin-left: 50px
      .subtitle,input
        margin-bottom: 10px
      .submit-button
        +button
    .loading
      width: 100%
      height: 100%
      +flexbox
      +align-items(center)
      +flex-direction(column)
      +justify-content(center)
      .subtitle
        margin-bottom: 30px

  .everything-is-good
    width: 100%
    height: 100%
    +flexbox
    +flex-direction(column)
    +justify-content(center)
    +align-items(center)
    .subtitle
      margin-bottom: 5px


</style>
