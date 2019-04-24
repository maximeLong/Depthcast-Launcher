import Vue            from 'vue'
import Vuex           from 'vuex'
import modules        from './modules'
import setupPaths     from './plugins/SetupPaths'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    setupPaths
  ],
  strict: process.env.NODE_ENV !== 'production'
})
