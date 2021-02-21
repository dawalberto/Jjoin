<template>
  <div class="h-full">
    <div class="body-screen">
      <div class="w-2/4 mr-8">
        <div class="flex items-center">
          <input class="mr-2" type="checkbox" id="saveOneFile" checked />
          <label for="saveOneFile">
            Save a file that for each match write this value
          </label>
        </div>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button class="bg-yellow-300 px-6 py-4 w-full text-center uppercase">
          add field
        </button>
        <div class="mt-16">
          <div class="flex items-center">
            <label for="file1Name" class="mr-2">Name:</label>
            <input id="file1Name" type="text" class="input-file-name" />
            <label for="file1Extension" class="mr-2">Extension:</label>
            <select name="" id="file1Extension" class="select-extension-file">
              <option
                v-for="extension of extensions"
                :key="extension"
                :value="extension"
              >
                {{ extension }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="w-2/4">
        <div class="flex items-center">
          <input class="mr-2" type="checkbox" id="saveManyFiles" />
          <label for="saveManyFiles">
            Save as many files as matches with this value
          </label>
        </div>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button class="bg-yellow-300 px-6 py-4 w-full text-center uppercase">
          add field
        </button>
        <div class="mt-16">
          <div class="flex items-center">
            <label for="file2Name" class="mr-2">Name:</label>
            <input id="file2Name" type="text" class="input-file-name" />
            <label for="file2Extension" class="mr-2">Extension:</label>
            <select name="" id="file2Extension" class="select-extension-file">
              <option
                v-for="extension of extensions"
                :key="extension"
                :value="extension"
              >
                {{ extension }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <footer-control />
  </div>
</template>

<script>
import FooterControl from '../components/FooterControl.vue'
export default {
  components: { FooterControl },
  mounted() {
    this.$store.commit('updateCurrentPage', this.$route.name)
  },
  data() {
    return {
      extensions: ['txt', 'sql']
    }
  }
}
</script>

<style>
textarea {
  @apply h-24 w-full mt-3 border border-gray-700 p-1;
}

input[type='checkbox'] {
  @apply h-5 w-5 relative;
}

input[type='checkbox']:checked:after {
  content: '';
  position: absolute;
  @apply bg-yellow-300 w-full h-full border border-gray-700;
}

input[type='checkbox']:checked:after {
  content: '\2713';
  position: absolute;
  line-height: 1.2rem;
  font-size: 1.2rem;
  padding-left: 0.1rem;
  @apply text-gray-700;
}

.input-file-name {
  @apply flex-grow border-b border-gray-700 mr-6 focus:outline-none focus:border-yellow-300;
}

.select-extension-file {
  @apply focus:outline-none border border-gray-700 focus:border-yellow-300 p-0.5;
}
</style>
