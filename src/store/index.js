import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: '',
    file1: null,
    file2: null,
    file1Json: null,
    file2Json: null
  },
  mutations: {
    updateCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setFile(state, fileChosen) {
      switch (fileChosen.file) {
        case 'file1':
          state.file1 = fileChosen.chosen
          break

        case 'file2':
          state.file2 = fileChosen.chosen
          break
      }
    },
    setFileJson(state, fileJson) {
      switch (fileJson.file) {
        case 'file1':
          state.file1Json = fileJson.json
          break

        case 'file2':
          state.file2Json = fileJson.json
          break
      }
    }
  },
  actions: {},
  modules: {}
})
