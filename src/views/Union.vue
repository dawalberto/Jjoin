<template>
  <div>
    <button @click="buildCondition(1, 1)">buildCondition</button>
    <button @click="backHome">HOME</button>
    <div
      class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-2/5 flex justify-center items-center"
    >
      <progress :value="totalProgress" max="100"></progress>
      <!-- <div class="progress-container">
        <div class="progress-value" ref="progress">
          {{ totalProgress }}
        </div>
      </div> -->
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
      this.joinFiles()
      // this.writeFileSync()
    }, 100)
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
    ]),
    widthPercentage() {
      return this.totalProgress + '%'
    }
  },
  data() {
    return {
      totalProgress: 0,
      oneFileValueReadyToWrite: ''
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
      let condition
      let oneFileValueToWrite = ''

      for (let i = 0; i < this.file1Json.length; i++) {
        this.totalProgress = Math.round(((i + 1) * 100) / this.file1Json.length)

        for (let j = 0; j < this.file2Json.length; j++) {
          condition = this.buildCondition(i, j)

          if (condition) {
            oneFileValueToWrite += `${this.getValueToWriteInFile(i, j)}\n`
            continue
          }
        }
      }

      this.oneFileValueReadyToWrite = oneFileValueToWrite
    },
    getValueToWriteInFile(i, j) {
      let valueToWrite = this.oneFileValue.replaceAll(
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
    writeFileSync() {
      try {
        fs.writeFileSync(
          '/Users/dawalberto/Desktop/jjoin.txt',
          this.oneFileValueReadyToWrite
        )
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
/* .progress-container {
  @apply appearance-none h-5 w-full border border-gray-600 shadow-inner;
}

.progress-value {
  @apply w-0 h-full bg-yellow-300;
  transition: width 0.1s;
} */

progress[value] {
  @apply appearance-none w-full border border-gray-600;
}

progress[value]::-webkit-progress-bar {
  @apply shadow-inner bg-white;
}

progress[value]::-webkit-progress-value {
  @apply bg-yellow-300 transition-none;
  /* transition: width 0.1s; */
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
