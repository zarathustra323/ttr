<template>
  <h1>Manage Game</h1>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">
          Games
        </router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ gameData.name }} Game ({{ createdDate }})
      </li>
    </ol>
  </nav>
  <hr>

  <div class="row">
    <div class="col-lg-6">
      <h4>Players</h4>
      <div class="d-grid gap-3">
        <player-card
          v-for="[colorId, player] in game.players"
          :key="colorId"
          :player="player"
          :all-nodes="game.graph.nodes"
          :all-edges="game.graph.edges"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Game from '../game';
import PlayerCard from '../components/manage-game/player-card.vue';
import storage from '../storage';
import dayjs from '../dayjs';
import gameData from '../../data';

export default {
  components: {
    PlayerCard,
  },
  data: () => ({
    game: null,
  }),

  created() {
    const serialized = storage.get(`game-${this.$route.params.gameId}`);
    const game = Game.deserialize(serialized);
    console.log(game);
    this.game = game;
  },

  computed: {
    gameTypeId() {
      return this.game.typeId;
    },
    gameData() {
      return gameData.get(this.gameTypeId);
    },
    createdDate() {
      const date = new Date(this.game.created);
      return dayjs(date).format('MMM Do, YYYY @ HH:mma');
    },
  },
};
</script>
