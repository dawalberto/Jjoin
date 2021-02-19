<template>
  <div class="h-full">
    <div class="body-screen">
      <div class="mx-4">file1</div>
      <div class="mx-4">file2</div>
    </div>
    <footer-control />
  </div>
</template>

<script>
import FooterControl from '@/components/FooterControl.vue'

export default {
  components: { FooterControl },
  mounted: function() {
    this.$store.commit('updateCurrentPage', this.$route.name)
  }
}
</script>

<style></style>
