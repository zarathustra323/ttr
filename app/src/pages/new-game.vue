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
    <div class="col-lg-6">
      <h3>{{ gameData.name }}</h3>
      <new-game :game-data="gameData" @submit="createGame" />
    </div>
  </div>
</template>

<script>
import storage from '../storage';
import gameData from '../../data';
import NewGame from '../components/new-game.vue';
import Game from '../game';

export default {
  components: {
    NewGame,
  },

  computed: {
    gameData() {
      const { typeId } = this.$route.params;
      const data = gameData.get(typeId);
      return data;
    },
  },

  methods: {
    createGame({ players }) {
      const game = new Game({ typeId: this.gameData.id });
      players.forEach((player) => {
        game.addPlayer({ name: player.name, colorId: player.colorId });
      });
      storage.set(`game-${game.id}`, game.serialize());
      storage.push('gameIds', game.id);

      this.$router.push('/');
    },
  },
};
</script>
