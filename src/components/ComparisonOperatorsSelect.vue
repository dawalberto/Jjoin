<template>
  <select
    @change="updateConditionToAdd"
    v-model="selected"
    class="inline py-1 px-2 border border-yellow-300 focus:outline-none sm:text-sm"
  >
    <option v-for="(operator, i) in comparisonOperators" :key="i" :value="i">
      {{ operator }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      comparisonOperators: ['==', '!=', '<', '<=', '>=', '>'],
      selected: 0
    }
  },
  methods: {
    updateConditionToAdd() {
      this.$store.commit('updateConditionToAdd', {
        part: 'comparisonOperator',
        comparisonOperator: {
          key: this.selected,
          text: this.comparisonOperators[this.selected]
        }
      })
    }
  }
}
</script>

<style></style>
