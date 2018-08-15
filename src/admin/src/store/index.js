import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import tours from './tours'
import sights from './sights'
import socPackages from './soc_packages'
import messagesAndOrders from './messages_and_orders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, shared, tours, sights, socPackages, messagesAndOrders
  }
})
