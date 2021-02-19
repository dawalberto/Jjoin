import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: '',
    file1: {},
    file2: {}
  },
  mutations: {
    updateCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setFile1(state, file) {
      state.file1 = file
    },
    setFile2(state, file) {
      state.file2 = file
    }
  },
  actions: {},
  modules: {}
})
