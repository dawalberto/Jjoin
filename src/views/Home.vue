<template>
  <button @click="start">GO!</button>
</template>

<script>
export default {
  created() {
    this.start()
  },
  methods: {
    start() {
      this.$store.commit('showNav')
      this.$router.push('screen1')
    }
  }
}
</script>
