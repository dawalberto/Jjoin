<template>
  <div>
    <h1 class=" ml-2 text-2xl font-light tracking-wider">{{ file1Name }}</h1>
    <div>
      <button
        v-for="(col, i) of file1HeaderCols"
        :key="i"
        @click="addField('file1', { key: i, text: col })"
        class="button-add-col"
      >
        {{ col }}
      </button>
    </div>
    <h1 class="mt-8 ml-2  text-2xl font-light tracking-wider">
      {{ file2Name }}
    </h1>
    <div>
      <button
        v-for="(col, i) of file2HeaderCols"
        :key="i"
        @click="addField('file2', { key: i, text: col })"
        class="button-add-col"
      >
        {{ col }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.file1Name = this.$store.state.file1.customName
    this.file2Name = this.$store.state.file2.customName
    this.file1HeaderCols = this.$store.state.file1HeaderCols
    this.file2HeaderCols = this.$store.state.file2HeaderCols
  },
  data() {
    return {
      file1Name: null,
      file2Name: null,
      file1HeaderCols: null,
      file2HeaderCols: null
    }
  },
  methods: {
    addField(file, field) {
      this.$emit('addField', { file, field })
    }
  }
}
</script>

<style>
.button-add-col {
  @apply bg-yellow-300 px-6 py-4 text-center mr-2 mt-2 border border-gray-700;
}
</style>
