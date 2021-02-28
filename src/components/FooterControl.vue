<template>
  <div
    class="flex justify-center bg-transparent fixed bottom-0 left-0 w-full p-10"
  >
    <div>
      <button
        class="mx-4 bg-gray-800 text-white px-6 py-4 w-32 text-center uppercase"
        :class="{ hidden: currentPage === 'Screen1' }"
        @click="$emit('previous-screen')"
      >
        previous
      </button>
    </div>
    <div>
      <button
        class="mx-4 bg-yellow-300 px-6 py-4 w-32 text-center uppercase"
        @click="$emit('next-screen')"
      >
        next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: ''
    }
  },
  watch: {
    '$store.state.currentPage': function() {
      this.currentPage = this.$store.state.currentPage
    }
  }
}
</script>

<style></style>
