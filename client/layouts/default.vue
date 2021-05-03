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
html {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: #000;
  background: #fff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

@media (prefers-color-scheme: dark) {
  html {
    color: #fff;
    background: #303030;
  }
}
</style>
