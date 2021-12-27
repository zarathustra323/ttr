<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-0">
        Games
      </h1>
      <div class="d-flex gap-2">
        <new-game-dropdown />

        <export-dropdown
          @import="loadGames"
          @clear="loadGames"
        />
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
import ExportDropdown from '../components/export-dropdown.vue';
import NewGameDropdown from '../components/new-game-dropdown.vue';
import GameListCard from '../components/game-list-card.vue';
import storage from '../storage';

export default {
  components: {
    ExportDropdown,
    NewGameDropdown,
    GameListCard,
  },

  data: () => ({
    games: [],
  }),

  created() {
    this.loadGames();
  },

  methods: {
    loadGames() {
      const gameIds = storage.getAsArray('gameIds');
      this.games = gameIds.map((id) => storage.get(`game-${id}`)).filter((v) => v);
    },
  },
};
</script>
