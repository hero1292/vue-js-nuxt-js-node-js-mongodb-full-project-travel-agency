import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import tours from './tours'
import sights from './sights'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, shared, tours, sights
  }
})
