<template>
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
      <button class="bg-yellow-300 text-gray-700 w-8 h-8 ml-8">&&</button>
      <button class="bg-yellow-300 text-gray-700 w-8 h-8 ml-1">||</button>
    </template>
    <template v-else>
      <button class="bg-green-300 w-8 h-8 ml-8">
        <img
          src="@/assets/images/plus.svg"
          alt="add condition"
          class="m-auto"
        />
      </button>
    </template>
    <!-- <button class="bg-red-400 w-8 h-8 ml-1">
      <img src="@/assets/images/trash.svg" alt="trash" class="m-auto" />
    </button> -->
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
  }
}
</script>

<style></style>
