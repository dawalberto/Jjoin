<template>
  <div id="app" class="flex flex-col m-auto h-screen max-w-screen-2xl">
    <nav-steps />
    <router-view />
  </div>
</template>

<script>
import NavSteps from './components/NavSteps.vue'
export default {
  components: { NavSteps }
}
</script>

<style></style>
