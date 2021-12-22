<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-0">
        Games
      </h1>
      <div class="d-flex gap-2">
        <new-game-dropdown />

        <div>
          <button type="button" class="btn btn-danger" @click="clearData">
            <span class="d-none d-md-inline">
              Clear All Data
            </span>
            <span class="d-md-none">
              Clear
            </span>
          </button>
        </div>
      </div>
    </div>
    <hr>
  </div>

  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
    <div v-for="game in games" :key="game.id" class="col">
      <game-list-card :game="game" />
    </div>
  </div>
</template>

<script>
import NewGameDropdown from '../components/new-game-dropdown.vue';
import GameListCard from '../components/game-list-card.vue';
import storage from '../storage';

export default {
  components: {
    NewGameDropdown,
    GameListCard,
  },

  data: () => ({
    games: [],
  }),

  mounted() {
    this.games = storage.getAsArray('games');
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
