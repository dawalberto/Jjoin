<template>
  <div v-if="showNav" id="nav" class="my-8">
    <div class="flex items-center justify-between w-2/5 h-full m-auto relative">
      <span
        class="absolute w-full border-b-2 border-dashed border-gray-700 z-0"
      ></span>
      <router-link
        class="step"
        :class="{ current: currentPage === 'Screen1' }"
        to="/screen1"
        >1</router-link
      >
      <router-link
        class="step"
        :class="{ current: currentPage === 'Screen2' }"
        to="/screen2"
        >2</router-link
      >
      <router-link
        class="step"
        :class="{ current: currentPage === 'Screen3' }"
        to="/screen3"
        >3</router-link
      >
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
  @apply z-10
  h-28
  w-28
  flex
  items-center
  justify-center
  text-3xl
  text-white
  rounded-full
  bg-gray-700
  transition
  duration-300
  cursor-default;
  will-change: transform;
}

.current {
  @apply bg-yellow-300 text-gray-700;
}

/* .step:hover {
  @apply transform scale-110 bg-green-400;
} */
</style>
