import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: ''
  },
  mutations: {
    updateCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    }
  },
  actions: {},
  modules: {}
})
