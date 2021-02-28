<template>
  <select
    @change="updateConditionToAdd"
    v-model="selected"
    class="inline py-1 px-2 border border-gray-800 focus:outline-none sm:text-sm"
  >
    <option v-for="(col, i) in cols" :key="i" :value="i">
      {{ col }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    file: {
      type: String,
      default: ''
    },
    cols: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: 0
    }
  },
  methods: {
    updateConditionToAdd() {
      this.$store.commit('updateConditionToAdd', {
        part: this.file,
        [this.file]: { key: this.selected, text: this.cols[this.selected] }
      })
    }
  }
}
</script>

<style></style>
