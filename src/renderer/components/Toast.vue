<template>
  <div id="toast">
    <div class="toast-message" v-if="showToast">
      {{toastMessage}}
    </div>
  </div>
</template>

<script>
import  { mapState }  from 'vuex'
export default {
  name: 'toast',
  data () {
    return {}
  },
  computed: {
    showToast: function() {
      if (!this.isOnline) { return true } else { return false }
    },
    toastMessage: function() { return this.$store.state.Executables.toastMessage },
    isOnline: function() { return this.$store.state.Executables.isOnline }
  }
}
</script>

<style lang="sass">
@import src/renderer/styles/main
#toast
  position: absolute
  bottom: 20px
  right: 20px
  width: 200px
  height: auto
  .toast-message
    background-color: $action_color
    width: 100%
    height: 100%
    padding: 10px
    color: black


</style>
