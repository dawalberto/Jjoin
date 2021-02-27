<template>
  <div class="h-full">
    <fields-to-add
      v-show="seeAddField"
      @addField="addField"
      class="fields-to-add"
    />
    <div class="body-screen">
      <div class="w-2/4 mr-8">
        <div class="flex items-center">
          <input
            @change="checkboxChange"
            class="mr-2"
            type="checkbox"
            id="saveOneFile"
            checked
          />
          <label for="saveOneFile">
            Save a file that for each match write this value
          </label>
        </div>
        <textarea v-model="oneFileValue" cols="30" rows="10"></textarea>
        <button
          @click="showAddField('oneFile')"
          class="bg-yellow-300 px-6 py-4 w-full text-center uppercase"
        >
          add field
        </button>
        <div class="mt-16">
          <div class="flex items-center">
            <label for="oneFileName" class="mr-2">Name:</label>
            <input
              id="oneFileName"
              v-model="oneFileName"
              type="text"
              class="input-file mr-6"
            />
            <label for="oneFileExtension" class="mr-2">Extension:</label>
            <select
              id="oneFileExtension"
              v-model="oneFileExtension"
              class="select-extension-file"
            >
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
          <input
            @change="checkboxChange"
            class="mr-2"
            type="checkbox"
            id="saveManyFiles"
          />
          <label for="saveManyFiles">
            Save as many files as matches with this value
          </label>
        </div>
        <textarea v-model="manyFilesValue" cols="30" rows="10"></textarea>
        <button
          @click="showAddField('manyFiles')"
          class="bg-yellow-300 px-6 py-4 w-full text-center uppercase"
        >
          add field
        </button>
        <div class="mt-16">
          <div class="flex items-center">
            <label for="manyFilesName" class="mr-2">Name:</label>
            <input
              id="manyFilesName"
              v-model="manyFilesName"
              type="text"
              class="input-file mr-6"
            />
            <label for="manyFilesExtension" class="mx-2">Extension:</label>
            <select
              v-model="manyFilesExtension"
              id="manyFilesExtension"
              class="select-extension-file mr-4"
            >
              <option
                v-for="extension of extensions"
                :key="extension"
                :value="extension"
              >
                {{ extension }}
              </option>
            </select>
            <button
              @click="showAddField('manyFilesName')"
              class=" bg-yellow-300 px-4 py-2 text-center uppercase"
            >
              add field
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer-control
      @next-screen="nexScreen"
      @previous-screen="previousScreen"
    />
  </div>
</template>

<script>
import FieldsToAdd from '../components/FieldsToAdd.vue'
import FooterControl from '../components/FooterControl.vue'

export default {
  components: { FooterControl, FieldsToAdd },
  mounted() {
    this.$store.commit('updateCurrentPage', this.$route.name)
  },
  data() {
    return {
      extensions: ['txt', 'sql'],
      seeAddField: false,
      addFieldsToOneFileValue: false,
      addFieldsToManyFilesValue: false,
      addFieldsToManyFilesName: false,
      oneFileChecked: true,
      oneFileName: '',
      oneFileValue: '',
      oneFileExtension: 'txt',
      manyFilesChecked: false,
      manyFilesName: '',
      manyFilesValue: '',
      manyFilesExtension: 'txt'
    }
  },
  methods: {
    addField(field) {
      this.seeAddField = false

      if (this.addFieldsToOneFileValue) {
        this.oneFileValue = `${this.oneFileValue}${field.file}[${field.field.key}]`
      } else if (this.addFieldsToManyFilesValue) {
        this.manyFilesValue = `${this.manyFilesValue}${field.file}[${field.field.key}]`
      } else {
        this.manyFilesName = `${this.manyFilesName}${field.file}[${field.field.key}]`
      }
    },
    showAddField(to) {
      switch (to) {
        case 'oneFile':
          this.addFieldsToOneFileValue = true
          this.addFieldsToManyFilesValue = false
          this.addFieldsToManyFilesName = false
          break
        case 'manyFiles':
          this.addFieldsToOneFileValue = false
          this.addFieldsToManyFilesValue = true
          this.addFieldsToManyFilesName = false
          break
        case 'manyFilesName':
          this.addFieldsToOneFileValue = false
          this.addFieldsToManyFilesValue = false
          this.addFieldsToManyFilesName = false
          break
      }

      this.seeAddField = true
    },
    checkboxChange(e) {
      const checked = e.target.checked

      if (e.target.id === 'saveOneFile') {
        this.oneFileChecked = checked
      } else if (e.target.id === 'saveManyFiles') {
        this.manyFilesChecked = checked
      }
    },
    nexScreen() {
      if (!this.oneFileChecked && !this.manyFilesChecked) {
        alert('Check at least one option to save files')
        return
      }

      if (this.oneFileChecked && !this.oneFileName) {
        alert('Write a name for the file')
        return
      }

      if (this.manyFilesChecked && !this.manyFilesName) {
        alert('Write a name for the files')
        return
      }

      this.$store.commit('setFilesToSaveOptions', {
        option: 'oneFile',
        checked: this.oneFileChecked,
        value: this.oneFileValue,
        name: this.oneFileName,
        extension: this.oneFileExtension
      })
      this.$store.commit('setFilesToSaveOptions', {
        option: 'manyFiles',
        checked: this.manyFilesChecked,
        value: this.manyFilesValue,
        name: this.manyFilesName,
        extension: this.manyFilesExtension
      })

      this.$router.push('union')
    },
    previousScreen() {
      this.$store.commit('deleteConditions')
      this.$store.commit('clearConditionToAdd')
      this.$router.push('screen2')
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

.input-file {
  @apply flex-grow border-b border-gray-700 focus:outline-none focus:border-yellow-300;
}

.select-extension-file {
  @apply focus:outline-none border border-gray-700 focus:border-yellow-300 p-0.5;
}

.fields-to-add {
  @apply absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-2/4 z-10 p-4 border border-gray-700;
  backdrop-filter: blur(0.3rem);
}
</style>
