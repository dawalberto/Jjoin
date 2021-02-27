<template>
  <div class="h-full">
    <div class="body-screen space-x-4">
      <div class="drag-drop-container">
        <form
          :class="{ 'is-dragover': isDragoverFile1 }"
          method="post"
          action=""
          enctype="multipart/form-data"
          @drag.stop.prevent
          @dragstart.stop.prevent
          @dragend.stop.prevent
          @dragover.stop.prevent="drag('file1')"
          @dragenter.stop.prevent="drag('file1')"
          @dragleave.stop.prevent="dragLeave('file1')"
          @drop.prevent="dropFile1"
        >
          <div>
            <span
              class="absolute top-5 left-5 font-light tracking-wider opacity-75"
            >
              File 1
            </span>
            <input
              type="file"
              name="files[]"
              ref="file1"
              id="file1"
              @change="getFile1"
            />
            <div>
              <img
                v-if="!file1Chosen"
                src="@/assets/images/upload.svg"
                alt="upload"
                class="inline-block m-auto w-36 h-36 opacity-50"
              />
              <img
                v-else
                src="@/assets/images/done.svg"
                alt="uploaded"
                class="inline-block m-auto w-36 h-36 opacity-50"
              />
            </div>
            <label for="file1" v-if="!file1Chosen">
              <strong class="cursor-pointer hover:text-gray-600">
                Choose a file
              </strong>
              <span class="inline"> or drag it here</span>.
            </label>
            <span v-else>{{ file1Chosen.name }}</span>
          </div>
        </form>
      </div>
      <div class="drag-drop-container">
        <form
          :class="{ 'is-dragover': isDragoverFile2 }"
          method="post"
          action=""
          enctype="multipart/form-data"
          @drag.stop.prevent
          @dragstart.stop.prevent
          @dragend.stop.prevent
          @dragover.stop.prevent="drag('file2')"
          @dragenter.stop.prevent="drag('file2')"
          @dragleave.stop.prevent="dragLeave('file2')"
          @drop.prevent="dropFile2"
        >
          <div>
            <span
              class="absolute top-5 left-5 font-light tracking-wider opacity-75"
            >
              File 2
            </span>
            <input
              type="file"
              name="files[]"
              ref="file2"
              id="file2"
              @change="getFile2"
            />
            <div>
              <img
                v-if="!file2Chosen"
                src="@/assets/images/upload.svg"
                alt="upload"
                class="inline-block m-auto w-36 h-36 opacity-50"
              />
              <img
                v-else
                src="@/assets/images/done.svg"
                alt="uploaded"
                class="inline-block m-auto w-36 h-36 opacity-50"
              />
            </div>
            <label for="file2" v-if="!file2Chosen">
              <strong class="cursor-pointer hover:text-gray-600">
                Choose a file
              </strong>
              <span class="inline"> or drag it here</span>.
            </label>
            <span v-else>{{ file2Chosen.name }}</span>
          </div>
        </form>
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
  mounted() {
    this.$store.commit('updateCurrentPage', this.$route.name)
  },
  data() {
    return {
      file1Name: 'f1',
      file2Name: 'f2',
      file1Chosen: null,
      file2Chosen: null,
      isDragoverFile1: false,
      isDragoverFile2: false
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
        alert('Select two files to continue')
        return false
      }

      if (!this.file1Chosen.customName || !this.file2Chosen.customName) {
        alert('Indicates a name for the files')
        return false
      }

      return true
    },
    drag(file) {
      if (file === 'file1') {
        this.isDragoverFile1 = true
      } else {
        this.isDragoverFile2 = true
      }
    },
    dragLeave(file) {
      if (file === 'file1') {
        this.isDragoverFile1 = false
      } else {
        this.isDragoverFile2 = false
      }
    },
    dropFile1(e) {
      this.dragLeave('file1')
      this.$refs.file1.files = e.dataTransfer.files
      this.file1Chosen = [...this.$refs.file1.files][0]
      console.log([...this.$refs.file1.files][0])
    },
    dropFile2(e) {
      this.dragLeave('file2')
      this.$refs.file2.files = e.dataTransfer.files
      this.file2Chosen = [...this.$refs.file2.files][0]
      console.log([...this.$refs.file2.files][0])
    },
    nextScreen() {
      this.buildFilesObjects()
      if (this.validateFiles()) {
        this.$store.commit('setFile', {
          file: 'file1',
          chosen: this.file1Chosen
        })
        this.$store.commit('setFile', {
          file: 'file2',
          chosen: this.file2Chosen
        })
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
.drag-drop-container {
  @apply w-2/5 relative;
}

form {
  @apply bg-yellow-300 p-12;
  color: #0f3c4b;
  text-align: center;
  vertical-align: baseline;
  outline: 2px dashed #92b0b3;
  outline-offset: -10px;
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
}

form input[type='file'] {
  display: none;
  /* vertical-align: baseline;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  line-height: normal;
  border-radius: 0;
  border: none;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1; */
}

.is-dragover {
  @apply bg-white;
}
</style>
