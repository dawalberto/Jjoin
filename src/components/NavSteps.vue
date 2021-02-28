<template>
  <div v-if="showNav" id="nav" class="my-8">
    <div class="flex items-center justify-between w-2/5 h-full m-auto relative">
      <span
        class="line-steps absolute w-full border-dashed border-gray-700 z-0"
      ></span>
      <div class="step" :class="{ current: currentPage === 'Screen1' }">1</div>
      <div class="step" :class="{ current: currentPage === 'Screen2' }">2</div>
      <div class="step" :class="{ current: currentPage === 'Screen3' }">3</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: '',
      showNav: false
    }
  },
  watch: {
    '$store.state.currentPage': function() {
      this.currentPage = this.$store.state.currentPage
    },
    '$store.state.showNav': function() {
      this.showNav = this.$store.state.showNav
    }
  }
}
</script>

<style>
#nav {
  height: 15%;
}

.step {
  @apply z-10 h-28 w-28 flex items-center justify-center text-3xl text-white font-thin rounded-full bg-gray-700 transition duration-300 cursor-default;
  will-change: transform;
}

.current {
  @apply bg-yellow-300 text-gray-700;
}

.line-steps {
  border-bottom: 1.5px;
}
</style>
