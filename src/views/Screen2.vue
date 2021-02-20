<template>
  <div class="h-full">
    <h1 class="text-center">union conditions</h1>
    <div class="body-screen">
      <div class="file-container">
        <xlsx-read :file="file1" @parsed="parsedFile1">
          <xlsx-table />
        </xlsx-read>
      </div>
      <div class="file-container">
        <xlsx-read :file="file2" @parsed="parsedFile2">
          <xlsx-table />
        </xlsx-read>
      </div>
    </div>
    <pre>{{ file1Json }}</pre>
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
      file2Json: {}
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
    }
  }
}
</script>

<style>
.file-container {
  @apply mx-4 flex-grow h-2/5 w-2/4 overflow-scroll;
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
