<template>
  <div>
    <button @click="backHome">HOME</button>
    <div
      class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4"
    >
      <h1
        v-if="processing"
        class="text-4xl font-thin tracking-wider flex items-center"
      >
        <div>
          <img
            src="@/assets/images/loader.svg"
            alt="loader"
            class="inline mr-4 h-9 w-9 animate-spin"
          />
          <span>Processing</span>
        </div>
      </h1>
      <h1
        v-else-if="joined"
        class="text-4xl justify-center font-thin tracking-wider flex items-center"
      >
        Completed 🎉
      </h1>
      <button
        v-show="runProcessManually && !processing"
        @click="runProcess"
        class="bg-yellow-300 py-4 px-6 uppercase tracking-wider font-thin text-4xl"
      >
        join and download files
      </button>
      <div
        v-show="joined"
        class="mt-6 w-full flex flex-col items-start space-y-1"
      >
        <h1 class="ml-2 text-2xl font-thin">Summary</h1>
        <p class="mt-4 tracking-wide">
          👉 Selected conditions:
          <span class="font-bold">{{ conditions | conditionsSummary }}</span>
        </p>
        <p class="tracking-wide">
          👉 Total match: <span class="font-bold">{{ totalMatch }}</span>
        </p>
        <p class="tracking-wide">
          👉 Total not found: <span class="font-bold">{{ totalNotMatch }}</span>
        </p>
        <p class="tracking-wide">
          👉 Files generated directory:
          <span class="font-bold">{{ directoryToDownload }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const fs = require('fs')
const electron = require('electron')

import { mapState } from 'vuex'

export default {
  created() {
    this.$store.commit('hiddeNav')
  },
  mounted() {
    setTimeout(() => {
      this.runProcess()
    }, 100)
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
      processing: false,
      joined: false,
      runProcessManually: false,
      oneFileValueReadyToWrite: '',
      manyFilesValueReadyToWrite: '',
      manyFilesNameReadyToWrite: '',
      directoryToDownload: '',
      totalMatch: 0,
      totalNotMatch: 0
    }
  },
  filters: {
    conditionsSummary(conditions) {
      let conditionsText = conditions.map(condition => {
        return typeof condition === 'object'
          ? `File1[${condition.file1.text}] ${condition.comparisonOperator.text} File2[${condition.file2.text}]`
          : ` ${condition} `
      })

      return conditionsText.toString().replaceAll(',', '')
    }
  },
  methods: {
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
      let match

      for (let i = 0; i < this.file1Json.length; i++) {
        match = false

        for (let j = 0; j < this.file2Json.length; j++) {
          if (this.buildCondition(i, j)) {
            match = true
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

        match ? this.totalMatch++ : this.totalNotMatch++
      }
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
        directory = this.directoryToDownload
        data = this.oneFileValueReadyToWrite
      } else {
        name = this.manyFilesNameReadyToWrite
        directory = `${this.directoryToDownload}/fileByJoin`
        data = this.manyFilesValueReadyToWrite
      }

      file = `${directory}/${name}.${this.filesToSaveOptions[file].extension}`
      try {
        fs.writeFileSync(file, data)
      } catch (error) {
        console.erroror('writeFileSync', error)
      }
    },
    runProcess() {
      this.processing = true
      this.selectDirToDownload()
    },
    selectDirToDownload() {
      electron.remote.dialog
        .showOpenDialog({ properties: ['openDirectory'] })
        .then(res => {
          let pathDirectorySelected = res.filePaths
          if (!res.filePaths.length) {
            alert('Operation canceled')
            this.processing = false
            this.runProcessManually = true
            return
          }

          this.directoryToDownload = pathDirectorySelected[0]

          if (this.filesToSaveOptions.manyFiles.checked) {
            if (!fs.existsSync(`${this.directoryToDownload}/fileByJoin`)) {
              fs.mkdirSync(`${this.directoryToDownload}/fileByJoin`, {
                recursive: true
              })
            }
          }

          this.joinFiles()

          if (this.filesToSaveOptions.oneFile.checked) {
            this.writeFileSync('oneFile')
          }
          this.processing = false
          this.joined = true
          this.runProcessManually = false
        })
        .catch(error => {
          console.log('selectDirToDownload', error)
        })
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
