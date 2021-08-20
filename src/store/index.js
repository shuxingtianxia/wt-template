import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import wtadmin from './modules'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    ...wtadmin
  },
  getters
})
