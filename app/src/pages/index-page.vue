<template>
  <div>
    <h1>Games</h1>
    <hr>

    <div class="d-flex justify-content-end">
      <new-game-dropdown />
    </div>
  </div>
</template>

<script>
import NewGameDropdown from '../components/new-game-dropdown.vue';

export default {
  components: {
    NewGameDropdown,
  },
};
</script>
