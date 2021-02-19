<template>
  <div class="h-full">
    <div class="flex justify-center">
      <div class="mx-4">
        <label for="file1Name">File 1:</label>
        <input type="text" id="file1Name" v-model="file1Name" />
        <div class="drag-container">
          <input type="file" @change="getFile1" name="" id="" />
        </div>
      </div>
      <div class="mx-4">
        <label for="file2Name">File 2:</label>
        <input type="text" id="file2Name" v-model="file2Name" />
        <div class="drag-container">
          <input type="file" @change="getFile2" name="" id="" />
        </div>
      </div>
    </div>
    <div
      class="flex justify-center bg-transparent fixed bottom-0 left-0 w-full p-10"
    >
      <div>
        <button
          class="mx-4 bg-gray-800 text-white px-6 py-4 w-32 text-center uppercase"
        >
          previous
        </button>
      </div>
      <div>
        <button
          class="mx-4 bg-yellow-300 px-6 py-4 w-32 text-center uppercase"
          @click="validateFiles"
        >
          next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.$store.commit('updateCurrentPage', this.$route.name)
  },
  data() {
    return {
      file1Name: '',
      file2Name: '',
      file1Chosen: {},
      file2Chosen: {}
    }
  },
  methods: {
    getFile1(event) {
      this.file1Chosen = event.target.files[0]
    },
    getFile2(event) {
      this.file2Chosen = event.target.files[0]
    },
    buildFilesObjects() {
      this.file1Chosen.customName = this.file1Name
      this.file2Chosen.customName = this.file2Name
    },
    validateFiles() {
      console.log(this.file1Chosen.customName)
      console.log(this.file1Name)
      if (!this.file1Chosen.customName || !this.file2Chosen.customName) {
        alert('indicates a name for the files')
        return
      }
      if (!this.file1Chosen.path || !this.file2Chosen.path) {
        alert('select two files to continue')
        return
      }
    },
    nextScreen() {
      this.buildFilesObjects()
      this.validateFiles()
    }
  }
}
</script>

<style>
.drag-container {
  @apply py-20 px-24 border border-gray-700 border-dashed;
}
</style>
