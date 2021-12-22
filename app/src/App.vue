<template>
  <primary-nav />
  <div class="container py-3">
    <router-view />
  </div>
</template>

<script>
import PrimaryNav from './components/primary-nav.vue';

export default {
  components: { PrimaryNav },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
