<template>
  <div>
    <h1>drag and drop</h1>
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
