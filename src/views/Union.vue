<template>
  <div>
    <button @click="buildCondition">buildCondition</button>
    <button @click="backHome">HOME</button>
    <div
      class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-2/5 flex justify-center items-center"
    >
      <progress :value="totalProgress" max="100"></progress>
    </div>
  </div>
</template>

<script>
const fs = require('fs')
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.commit('hiddeNav')
  },
  mounted() {
    setTimeout(() => {
      this.parseValueToWriteInFiles()
      this.joinFiles()
      // this.writeFileSync()
    }, 350)
  },
  computed: {
    ...mapState([
      'file1Json',
      'file2Json',
      'file1HeaderCols',
      'file2HeaderCols',
      'conditions',
      'oneFileValue',
      'manyFilesValue'
    ])
  },
  data() {
    return {
      totalProgress: 0,
      oneFileValueParsed: '',
      oneFileValueReadyToWrite: '',
      manyFilesValueParsed: ''
    }
  },
  methods: {
    buildCondition(file1, file2) {
      let finalCondition = ''
      let file1Value = ''
      let file2Value = ''
      let comparisonOperator = ''

      this.conditions.forEach(condition => {
        if (typeof condition === 'object') {
          file1Value = file1.file[file1.i][condition.file1.key]
          file2Value = file2.file[file2.j][condition.file2.key]
          comparisonOperator = condition.comparisonOperator.text

          finalCondition += `'${file1Value}' ${comparisonOperator} '${file2Value}'`
        } else {
          finalCondition += ` ${condition} `
        }
      })

      return finalCondition
    },
    joinFiles() {
      let condition
      let oneFileValueToWrite = ''
      let oneFileValueToWriteEvaluated = ''

      for (let i = 0; i < this.file1Json.length; i++) {
        this.totalProgress = Math.round(((i + 1) * 100) / this.file1Json.length)
        for (let j = 0; j < this.file2Json.length; j++) {
          condition = new Function(
            `return ${this.buildCondition(
              { file: this.file1Json, i },
              { file: this.file2Json, j }
            )}`
          )

          if (condition()) {
            oneFileValueToWriteEvaluated = eval(
              `\`${this.oneFileValueParsed}\``
            )
            oneFileValueToWrite += `${oneFileValueToWriteEvaluated}\n`
          }
        }
      }

      console.log(oneFileValueToWrite)
      this.oneFileValueReadyToWrite = oneFileValueToWrite
    },
    parseValueToWriteInFiles() {
      this.oneFileValueParsed = this.oneFileValue
      this.oneFileValueParsed = this.oneFileValueParsed.replace(
        /file1\[(.{1,4})\]/g,
        '${this.file1Json[i][$1]}'
      )
      this.oneFileValueParsed = this.oneFileValueParsed.replace(
        /file2\[(.{1,4})\]/g,
        '${this.file2Json[j][$1]}'
      )
    },
    writeFileSync() {
      try {
        fs.writeFileSync(
          '/Users/dawalberto/Desktop/jjoin.txt',
          this.oneFileValueReadyToWrite
        )
        //file written successfully
      } catch (err) {
        console.error(err)
      }
    },
    backHome() {
      this.$store.commit('deleteConditions')
      this.$store.commit('clearConditionToAdd')
      this.$router.push('/')
    }
  }
}
</script>

<style>
progress[value] {
  @apply appearance-none w-full border border-gray-600;
}

progress[value]::-webkit-progress-bar {
  @apply shadow-inner bg-white;
}

progress[value]::-webkit-progress-value {
  @apply bg-yellow-300;
  transition: width 0.1s;
}

progress[value]::-webkit-progress-value::after {
  content: '';
  width: 6px;
  height: 6px;
  position: absolute;
  border-radius: 100%;
  right: 7px;
  top: 7px;
  background-color: white;
}
</style>
