import Vue            from 'vue'
import Vuex           from 'vuex'
import modules        from './modules'
import setupIO        from './plugins/SetupIO'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    setupIO
  ],
  strict: process.env.NODE_ENV !== 'production'
})
