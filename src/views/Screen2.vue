<template>
  <div class="bg-yellow-500 h-full">
    <h1>union condition</h1>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.$store.commit('updateCurrentPage', this.$route.name)
  }
}
</script>

<style></style>
