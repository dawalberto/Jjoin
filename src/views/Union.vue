<template>
  <div>
    <button @click="backHome">HOME</button>
    <input
      type="file"
      id="selectDirToDownload"
      @change="onSelectDirToDownload"
      class="hidden"
      webkitdirectory
    />
    <div
      class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4"
    >
      <h1 class="text-4xl font-thin tracking-wider flex items-center">
        <template v-if="processing">
          <img
            src="@/assets/images/loader.svg"
            alt="loader"
            class="inline mr-4 h-9 w-9 animate-spin"
          />
          <span>Joining</span>
        </template>
        <span v-else>Joined 🎉</span>
      </h1>
    </div>
    <div
      class="flex justify-center bg-transparent fixed bottom-0 left-0 w-full p-10"
    >
      <button
        v-if="showDownloadButton"
        @click="showPromptToSelectDirToDownload"
        class="bg-yellow-300 py-4 px-6 uppercase tracking-wider font-thin text-4xl"
      >
        download files
      </button>
    </div>
  </div>
</template>

<script>
const fs = require('fs')
// const { app } = require('electron')
const zipdir = require('zip-dir')
import { mapState } from 'vuex'

export default {
  created() {
    this.createTmpDirsIfNotExists()
    this.$store.commit('hiddeNav')
  },
  mounted() {
    setTimeout(() => {
      this.joinFiles()
      // this.writeFileSync()
    }, 0)
  },
  computed: {
    ...mapState([
      'file1Json',
      'file2Json',
      'file1HeaderCols',
      'file2HeaderCols',
      'conditions',
      'filesToSaveOptions'
    ])
  },
  data() {
    return {
      processing: true,
      oneFileValueReadyToWrite: '',
      manyFilesValueReadyToWrite: '',
      manyFilesNameReadyToWrite: '',
      tempDirectory: '',
      tempDirectoryJjoin: '',
      tempDirectoryJjoinManyFiles: '',
      directoryToDownload: '',
      showDownloadButton: false
    }
  },
  watch: {
    processing(processing) {
      if (!processing) {
        if (this.filesToSaveOptions.oneFile.checked) {
          this.writeFileSync('oneFile')
        }
        this.showDownloadButton = true
      }
    }
  },
  methods: {
    createTmpDirsIfNotExists() {
      // let tempDir = `${app.getPath('temp')}`
      this.tempDirectory = '/Users/dawalberto/Desktop/tempDev'
      this.tempDirectoryJjoin = `${this.tempDirectory}/.jjoin`
      this.tempDirectoryJjoinManyFiles = `${this.tempDirectoryJjoin}/jjoinFiles`

      if (!fs.existsSync(this.tempDirectoryJjoin)) {
        fs.mkdirSync(this.tempDirectoryJjoin, { recursive: true })
      }
      if (this.filesToSaveOptions.manyFiles.checked) {
        if (!fs.existsSync(this.tempDirectoryJjoinManyFiles)) {
          fs.mkdirSync(this.tempDirectoryJjoinManyFiles, {
            recursive: true
          })
        }
      }
    },
    buildCondition(i, j) {
      let condition
      let nextCondition
      let solvedCondition = ''
      let solvedNextCondition = ''
      let file1Value = ''
      let file2Value = ''
      let comparisonOperator = ''

      condition = this.conditions[0]
      file1Value = this.file1Json[i][condition.file1.key]
      file2Value = this.file2Json[j][condition.file2.key]
      comparisonOperator = condition.comparisonOperator.text
      solvedCondition = this.resolveCondition(
        file1Value,
        comparisonOperator,
        file2Value
      )

      if (this.conditions.length === 1) {
        return solvedCondition
      }

      for (let x = 1; x < this.conditions.length; x = x + 2) {
        nextCondition = this.conditions[x + 1]
        file1Value = this.file1Json[i][nextCondition.file1.key]
        file2Value = this.file2Json[j][nextCondition.file2.key]
        comparisonOperator = nextCondition.comparisonOperator.text

        solvedNextCondition = this.resolveCondition(
          file1Value,
          comparisonOperator,
          file2Value
        )

        solvedCondition = this.resolveCondition(
          solvedCondition,
          this.conditions[x],
          solvedNextCondition
        )
      }

      return solvedCondition
    },
    resolveCondition(leftValue, operator, rightValue) {
      switch (operator) {
        case '&&':
          return leftValue && rightValue
        case '||':
          return leftValue || rightValue
        case '==':
          return leftValue == rightValue
        case '!=':
          return leftValue != rightValue
        case '<':
          return leftValue < rightValue
        case '<=':
          return leftValue <= rightValue
        case '>':
          return leftValue > rightValue
        case '>=':
          return leftValue >= rightValue
      }
    },
    joinFiles() {
      for (let i = 0; i < this.file1Json.length; i++) {
        for (let j = 0; j < this.file2Json.length; j++) {
          if (this.buildCondition(i, j)) {
            if (this.filesToSaveOptions.oneFile.checked) {
              this.oneFileValueReadyToWrite += `${this.getValueToWriteInFile(
                i,
                j,
                'oneFile'
              )}\n`
            }

            if (this.filesToSaveOptions.manyFiles.checked) {
              this.manyFilesValueReadyToWrite = this.getValueToWriteInFile(
                i,
                j,
                'manyFiles'
              )

              this.manyFilesNameReadyToWrite = this.getValueToWriteInFile(i, j)
              this.writeFileSync('manyFiles')
            }
            continue
          }
        }
      }

      this.processing = false
    },
    getValueToWriteInFile(i, j, writeIn) {
      let valueToWrite
      if (writeIn === 'oneFile' || writeIn === 'manyFiles') {
        valueToWrite = this.filesToSaveOptions[writeIn].value
      } else {
        valueToWrite = this.filesToSaveOptions.manyFiles.name
      }

      valueToWrite = valueToWrite.replaceAll(
        /file1\[(.{1,4})\]/g,
        (match, group) => {
          return `${this.file1Json[i][group]}`
        }
      )
      valueToWrite = valueToWrite.replaceAll(
        /file2\[(.{1,4})\]/g,
        (match, group) => {
          return `${this.file2Json[j][group]}`
        }
      )

      return valueToWrite
    },
    writeFileSync(file) {
      let data
      let directory
      let name

      if (file === 'oneFile') {
        name = this.filesToSaveOptions.oneFile.name
        directory = this.tempDirectoryJjoin
        data = this.oneFileValueReadyToWrite
      } else {
        name = this.manyFilesNameReadyToWrite
        directory = this.tempDirectoryJjoinManyFiles
        data = this.manyFilesValueReadyToWrite
      }

      file = `${directory}/${name}.${this.filesToSaveOptions[file].extension}`
      try {
        fs.writeFileSync(file, data)
      } catch (error) {
        console.erroror('writeFileSync', error)
      }
    },
    showPromptToSelectDirToDownload() {
      document.querySelector('#selectDirToDownload').click()
    },
    async zipAndDownloadFiles() {
      try {
        await zipdir(this.tempDirectoryJjoin, {
          saveTo: `${this.tempDirectory}/jjoin.zip`
        })
        fs.renameSync(
          `${this.tempDirectory}/jjoin.zip`,
          `${this.directoryToDownload}/jjoin.zip`
        )
        this.deleteTempDirectoryJjoin()
      } catch (error) {
        console.log('zipAndDownloadFiles', error)
      }
    },
    onSelectDirToDownload(e) {
      let directory = e.target.files[0].path
      directory = directory.slice(0, directory.lastIndexOf('/'))
      this.directoryToDownload = directory
      this.zipAndDownloadFiles()
    },
    deleteTempDirectoryJjoin() {
      fs.rmdirSync(this.tempDirectoryJjoin, { recursive: true })
    },
    backHome() {
      this.$store.commit('deleteConditions')
      this.$store.commit('clearConditionToAdd')
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
