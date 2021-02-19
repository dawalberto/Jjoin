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
    <footer-control
      @next-screen="nextScreen"
      @previous-screen="previousScreen"
    />
  </div>
</template>

<script>
import FooterControl from '@/components/FooterControl'

export default {
  components: { FooterControl },
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
      if (!this.file1Chosen.path || !this.file2Chosen.path) {
        alert('select two files to continue')
        return false
      }

      if (!this.file1Chosen.customName || !this.file2Chosen.customName) {
        alert('indicates a name for the files')
        return false
      }

      return true
    },
    nextScreen() {
      this.buildFilesObjects()
      if (this.validateFiles()) {
        this.$router.push('screen2')
      }
    },
    previousScreen() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.drag-container {
  @apply py-20 px-24 border border-gray-700 border-dashed;
}
</style>
