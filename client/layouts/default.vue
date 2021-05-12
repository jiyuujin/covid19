<template>
  <div class="container">
    <Nuxt />
    <footer-text />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const FooterText = () => import('~/components/FooterText.vue')

export default Vue.extend({
  components: {
    FooterText
  }
})
</script>

<style>
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
