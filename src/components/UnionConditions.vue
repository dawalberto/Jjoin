<template>
  <div>
    <div class="flex justify-center items-center font-light">
      <span>{{ file1Name }}.</span>
      <span>
        <file-header-cols-select file="file1" :cols="file1HeaderCols" />
      </span>
      <span class="mx-4"><comparison-operators-select /></span>
      <span>{{ file2Name }}.</span>
      <span>
        <file-header-cols-select file="file2" :cols="file2HeaderCols" />
      </span>
      <template v-if="conditions.length > 0">
        <button @click="addCondition('&&')" class="bg-yellow-300 w-8 h-8 ml-8">
          &&
        </button>
        <button @click="addCondition('||')" class="bg-yellow-300 w-8 h-8 ml-1">
          ||
        </button>
      </template>
      <template v-else>
        <button @click="addCondition" class="bg-green-300 w-8 h-8 ml-8">
          <img
            src="@/assets/images/plus.svg"
            alt="add condition"
            class="m-auto"
          />
        </button>
      </template>
    </div>
    <div class="mt-4 text-center font-extralight tracking-wider">
      <p v-for="(condition, i) of conditions" :key="i" class="inline">
        <template v-if="condition.file1">
          <span>{{ file1Name }}.{{ condition.file1.text }}</span>
          <span class="mx-2">{{ condition.comparisonOperator.text }}</span>
          <span>{{ file2Name }}.{{ condition.file2.text }}</span>
        </template>
        <span v-else class="mx-4 font-normal">{{ condition }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import ComparisonOperatorsSelect from './ComparisonOperatorsSelect.vue'
import FileHeaderColsSelect from './FileHeaderColsSelect.vue'
export default {
  components: { ComparisonOperatorsSelect, FileHeaderColsSelect },
  props: {
    file1Name: {
      type: String,
      default: () => {}
    },
    file2Name: {
      type: String,
      default: () => {}
    },
    file1HeaderCols: {
      type: Array,
      default: () => []
    },
    file2HeaderCols: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      //   conditionToAdd: {
      //     file1: { key: 0, text: '' },
      //     comparisonOperator: { key: 0, text: '' },
      //     file2: { key: 0, text: '' }
      //   },
      conditions: []
    }
  },
  methods: {
    addCondition(logicalOperator) {
      if (logicalOperator === '&&' || logicalOperator === '||') {
        this.conditions.push(logicalOperator)
        this.$store.commit('addCondition', logicalOperator)
      }

      const conditionToAdd = this.$store.state.conditionToAdd

      if (Object.keys(conditionToAdd).length !== 3) {
        if (!conditionToAdd.file1) {
          conditionToAdd.file1 = { key: 0, text: this.file1HeaderCols[0] }
        }
        if (!conditionToAdd.comparisonOperator) {
          const comparisonOperators = this.$store.state.comparisonOperators
          conditionToAdd.comparisonOperator = {
            key: 0,
            text: comparisonOperators[0]
          }
        }
        if (!conditionToAdd.file2) {
          conditionToAdd.file2 = { key: 0, text: this.file2HeaderCols[0] }
        }
      }

      this.conditions.push(JSON.parse(JSON.stringify(conditionToAdd)))
      this.$store.commit(
        'addCondition',
        JSON.parse(JSON.stringify(conditionToAdd))
      )
    }
  }
}
</script>

<style></style>
