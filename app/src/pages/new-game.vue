<template>
  <h1>New Game</h1>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">
          Games
        </router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        Create New
      </li>
    </ol>
  </nav>
  <hr>

  <div class="row">
    <div class="col-md-6">
      New Game: {{ game.name }}
    </div>
  </div>
</template>

<script>
import gameData from '../../data';

export default {
  data: () => ({
    gameData,
  }),

  computed: {
    game() {
      const { gameId } = this.$route.params;
      const game = this.gameData.get(gameId);
      return game;
    },
  },
};
</script>
