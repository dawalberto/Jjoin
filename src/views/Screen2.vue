<template>
  <div class="h-full">
    <div v-if="!filesLoaded">
      <div
        class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4"
      >
        <h1 class="text-4xl font-thin tracking-wider flex items-center">
          <img
            src="@/assets/images/loader.svg"
            alt="loader"
            class="inline mr-4 h-9 w-9 animate-spin"
          />
          <span>Procesing files</span>
        </h1>
      </div>
    </div>
    <div v-show="filesLoaded" class="h-full">
      <h1 class="text-center text-4xl font-thin tracking-wider">
        Union conditions
      </h1>
      <div class="body-screen">
        <div class="file-container">
          <span class="file-name">{{ file1.customName }}</span>
          <xlsx-read
            :file="file1"
            @parsed="parsedFile1"
            @loading="loadingFile1"
          >
            <xlsx-table />
          </xlsx-read>
        </div>
        <div class="file-container">
          <span class="file-name">{{ file2.customName }}</span>
          <xlsx-read
            :file="file2"
            @parsed="parsedFile2"
            @loading="loadingFile2"
          >
            <xlsx-table />
          </xlsx-read>
        </div>
      </div>
    </div>
    <footer-control />
  </div>
</template>

<script>
import FooterControl from '@/components/FooterControl.vue'
import XLSX from '../../node_modules/xlsx/xlsx'
import {
  XlsxRead,
  XlsxTable
} from '../../node_modules/vue-xlsx/dist/vue-xlsx.es'

export default {
  components: {
    XlsxRead,
    XlsxTable,
    FooterControl
  },
  mounted() {
    this.$store.commit('updateCurrentPage', this.$route.name)
    this.file1 = this.$store.state.file1
    this.file2 = this.$store.state.file2
  },
  data() {
    return {
      file1: {},
      file2: {},
      file1Json: {},
      file2Json: {},
      file1Loaded: false,
      file2Loaded: false,
      filesLoaded: false
    }
  },
  methods: {
    fileToJson(file, workSheet) {
      switch (file) {
        case 'file1':
          this.file1Json = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
          this.$store.commit('setFileJson', {
            file: 'file1',
            json: this.file1Json
          })
          break

        case 'file2':
          this.file2Json = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
          this.$store.commit('setFileJson', {
            file: 'file2',
            json: this.file2Json
          })
          break
      }
    },
    parsedFile1(workbook) {
      const firsrWorksheet = workbook.Sheets[workbook.SheetNames[0]]
      this.fileToJson('file1', firsrWorksheet)
    },
    parsedFile2(workbook) {
      const firsrWorksheet = workbook.Sheets[workbook.SheetNames[0]]
      this.fileToJson('file2', firsrWorksheet)
    },
    loadingFile1(loading) {
      this.file1Loaded = !loading

      if (this.file1Loaded && this.file2Loaded) {
        this.filesLoaded = true
      }
    },
    loadingFile2(loading) {
      this.file2Loaded = !loading

      if (this.file1Loaded && this.file2Loaded) {
        this.filesLoaded = true
      }
    }
  }
}
</script>

<style>
.file-container {
  @apply mx-4 flex-grow h-2/5 w-2/4 overflow-scroll relative;
}

.file-name {
  @apply sticky top-0 text-2xl text-gray-700 p-2 font-light tracking-wider bg-yellow-300 w-full inline-block;
  /* backdrop-filter: blur(0.1rem); */
}

table {
  @apply table-auto text-gray-700 bg-green-100;
}

table tr {
  @apply border border-green-300 py-1;
}

table td {
  @apply px-4;
}
</style>
