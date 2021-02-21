<template>
  <div class="h-full">
    <div class="body-screen">
      <div class="w-2/4 mr-8">
        <input type="checkbox" id="saveOneFile" />
        <label for="saveOneFile">
          Save a file that for each match write this value
        </label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button class="bg-yellow-300 px-6 py-4 w-full text-center uppercase">
          add field
        </button>
      </div>
      <div class="w-2/4">
        <input type="checkbox" id="saveManyFiles" />
        <label for="saveManyFiles">
          Save as many files as matches with this value
        </label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button class="bg-yellow-300 px-6 py-4 w-full text-center uppercase">
          add field
        </button>
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
  }
}
</script>

<style>
textarea {
  @apply h-24 w-full mt-3 border border-gray-700 p-1;
}
input[type='checkbox'] {
  @apply h-4 w-4;
}
</style>
