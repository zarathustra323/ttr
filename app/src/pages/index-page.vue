<template>
  <div>
    <h1>Games</h1>
    <hr>

    <div class="d-flex justify-content-end">
      <div class="d-flex">
        <new-game-dropdown />

        <button type="button" class="btn btn-danger ms-2" @click="clearData">
          Clear All Data
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NewGameDropdown from '../components/new-game-dropdown.vue';
import storage from '../storage';

export default {
  components: {
    NewGameDropdown,
  },

  methods: {
    clearData() {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to clear ALL game data?')) {
        storage.clear();
      }
    },
  },
};
</script>
