<template>
  <div id="update">

    <!-- handle installation -->
    <div class="installation" v-if="needsInstallation">

      <div class="info" v-if="!showLoading">
        <div class="title">Depthcast Installation</div>
        <div class="subtitle">It looks like Depthcast's executables haven't been created yet. Let's install them.</div>
      </div>
      <div class="install-form" v-if="!showLoading">
        <div class="subtitle">Enter the key you received in your welcome email:</div>
        <input :value="formKey" @input="updateFormKey" class="serial-key" placeholder="Your serial key">
        <div class="submit-button" @click="submitForInstallation">Submit Key</div>
        <div class="error" v-if="downloadError">Error: {{downloadError}}</div>
      </div>

      <div class="loading" v-if="showLoading">
        <div class="subtitle">{{downloadStatus}}</div>
        <scale-loader :loading="needsInstallation" :color="'#c3c3c3'"></scale-loader>
      </div>
    </div>

    <!-- handle updates -->
    <div class="post-installation" v-if="!needsInstallation">
      <div class="updates" v-if="needsUpdate">
        <div class="subtitle">Updates are available.</div>
        <div class="title">{{latestVersion}}</div>
        <div class="subtitle">Features</div>
        <pre class="notes">{{latestVersionNotes}}</pre>
        <div class="download-button" @click="tryDownloadUpdate" v-if="!updating">Download {{latestVersion}}</div>
        <div class="download-status" v-if="updating">
          <scale-loader :loading="updating" :color="'#c3c3c3'" :height="'13px'" :width="'3px'"></scale-loader>
          <div>Downloading...</div>
        </div>
      </div>
      <div class="no-updates" v-else>
        <div class="subtitle">You're completely up to date!</div>
          <router-link to="/">Go to launcher</router-link>
      </div>
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
      showLoading:  false,
      updating:     false
    }
  },
  components: {
    ScaleLoader
  },
  computed: mapState({
    needsInstallation:  state => state.Executables.needsInstallation,
    formKey:            state => state.Executables.formKey,
    downloadStatus:     state => state.Executables.downloadStatus,
    downloadError:      state => state.Executables.downloadError,
    launcherVersion:    state => state.Executables.launcherVersion,
    latestVersion:      state => state.Executables.latestVersion,
    latestVersionNotes: state => state.Executables.latestVersionNotes,
    needsUpdate:        state => state.Executables.needsUpdate,
  }),
  methods: {
    submitForInstallation() {
      this.showLoading = true;
      this.getExeAndUnpack().then(()=> {
        this.showLoading  = false;
        this.$store.commit('SET_NEEDS_INSTALLATION', false);
      }).catch((err)=> {
        this.showLoading = false;
      })
    },

    tryDownloadUpdate() {
      this.updating = true;
      this.downloadUpdate().then(()=> {
        this.updating = false;
      })
    },

    updateFormEmail(e) {
      this.$store.commit('UPDATE_FORM_EMAIL', e.target.value);
    },
    updateFormKey(e) {
      this.$store.commit('UPDATE_FORM_KEY', e.target.value);
    },
    ...mapActions([
      'getExeAndUnpack',
      'downloadUpdate'
    ])
  }

}
</script>

<style lang="sass">
@import src/renderer/styles/main

#update
  width: 100%
  height: 100%
  .installation,.post-installation
    width: 100%
    height: 100%
    padding: 0 50px
    +flexbox

  //installation form and loading
  .installation
    +flex-direction(row)
    +align-items(center)
    .info
      +flex(1)
      .title
        +headerText
        margin-bottom: 10px
    .install-form
      +flex(1)
      margin-left: 50px
      .subtitle,input,.submit-button
        margin-bottom: 10px
      .submit-button
        +button
      .error
        color: $action_color
    .loading
      width: 100%
      height: 100%
      +flexbox
      +align-items(center)
      +flex-direction(column)
      +justify-content(center)
      .subtitle
        margin-bottom: 30px

  //update info
  .post-installation
    +flex-direction(column)
    +justify-content(center)
    //+align-items(center)
    .title
      +headerText
      margin-bottom: 30px
    .subtitle
      margin-bottom: 5px
      &:first-of-type
        margin-bottom: 0
    .notes
      max-height: 200px
      overflow: auto
    .download-button
      +button
      width: 200px
      margin-top: 30px
    .download-status
      +button
      width: 200px
      margin-top: 30px
      color: #d8d8d8
      background-color: #444444
      cursor: default
      padding: 12px
      +flexbox
      +flex-direction(row)
      +align-items(center)
      +justify-content(space-around)
      .v-spinner
        margin: 0

    .no-updates
      +flexbox
      +flex-direction(column)
      +align-items(center)
      +justify-content(center)


</style>
