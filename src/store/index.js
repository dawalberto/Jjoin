import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showNav: false,
    currentPage: '',
    file1: null,
    file2: null,
    file1Json: null,
    file2Json: null,
    file1HeaderCols: null,
    file2HeaderCols: null,
    conditionToAdd: {},
    conditions: [],
    comparisonOperators: ['==', '!=', '<', '<=', '>=', '>'],
    filesToSaveOptions: {
      oneFile: {
        checked: true,
        value: '',
        name: '',
        extension: ''
      },
      manyFiles: {
        checked: false,
        value: '',
        name: '',
        extension: ''
      }
    }
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
    setFileHeaderCols(state, file) {
      switch (file.file) {
        case 'file1':
          state.file1HeaderCols = file.headerCols
          break

        case 'file2':
          state.file2HeaderCols = file.headerCols
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
    },
    updateConditionToAdd(state, partCondition) {
      switch (partCondition.part) {
        case 'file1':
          state.conditionToAdd.file1 = partCondition.file1
          break
        case 'file2':
          state.conditionToAdd.file2 = partCondition.file2
          break
        case 'comparisonOperator':
          state.conditionToAdd.comparisonOperator =
            partCondition.comparisonOperator
          break
      }
    },
    addCondition(state, condition) {
      state.conditions.push(condition)
    },
    deleteConditions(state) {
      state.conditions = []
    },
    clearConditionToAdd(state) {
      state.conditionToAdd = {}
    },
    setOneFileValue(state, oneFileValue) {
      state.filesToSaveOptions.oneFile.value = oneFileValue
    },
    setManyFilesValue(state, manyFilesValue) {
      state.filesToSaveOptions.manyFiles.value = manyFilesValue
    },
    setFilesToSaveOptions(state, options) {
      const { option, checked, value, name, extension } = options

      state.filesToSaveOptions[option].checked =
        checked || state.filesToSaveOptions[option].checked
      state.filesToSaveOptions[option].value =
        value || state.filesToSaveOptions[option].value
      state.filesToSaveOptions[option].name =
        name || state.filesToSaveOptions[option].name
      state.filesToSaveOptions[option].extension =
        extension || state.filesToSaveOptions[option].extension
    },
    showNav(state) {
      state.showNav = true
    },
    hiddeNav(state) {
      state.showNav = false
    }
  },
  actions: {},
  modules: {}
})
