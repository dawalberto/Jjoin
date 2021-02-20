<template>
  <div class="h-full">
    <h1 class="text-center">union conditions</h1>
    <div class="body-screen">
      <div class="file-container">
        <xlsx-read :file="file1">
          <xlsx-table />
        </xlsx-read>
      </div>
      <div class="file-container">
        <xlsx-read :file="file2">
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
    this.filesToJson()
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
    filesToJson() {
      let workbook = XLSX.readFile(this.file1.path)
      let firsrWorksheet = workbook.Sheets[workbook.SheetNames[0]]
      this.file1Json = XLSX.utils.sheet_to_json(firsrWorksheet, { header: 1 })

      workbook = XLSX.readFile(this.file2.path)
      firsrWorksheet = workbook.Sheets[workbook.SheetNames[0]]
      this.file2Json = XLSX.utils.sheet_to_json(firsrWorksheet, { header: 1 })
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
