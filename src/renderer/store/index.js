import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import {serverSetup} from './plugins/serverSetup'         //initialize application


Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    serverSetup
  ],
  strict: process.env.NODE_ENV !== 'production'
})
