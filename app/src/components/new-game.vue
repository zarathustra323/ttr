<template>
  <form @submit.prevent="createGame">
    <div v-for="(player, index) in players" :key="index" class="card mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="card-title mb-3">
            Player {{ index + 1 }}
          </h5>

          <remove-player-button
            :index="index"
            :disabled="isLoading || !canRemovePlayer"
            @click="removePlayer"
          />
        </div>
        <div class="row">
          <div class="col-sm-6 mb-2 mb-sm-0">
            <player-name
              v-model="player.name"
              :index="index"
              :disabled="isLoading"
            />
          </div>

          <div class="col-sm-6">
            <player-color
              v-model="player.colorId"
              :index="index"
              :disabled="isLoading"
              :all-colors="game.playerColors"
              :available-colors="availableColors"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <add-player-button
        :disabled="isLoading || !canAddPlayer"
        @click="addPlayer"
      />
      <create-game-button :disabled="isLoading" />
    </div>
  </form>
</template>

<script>
import storage from '../storage';
import AddPlayerButton from './new-game/buttons/add-player.vue';
import CreateGameButton from './new-game/buttons/create-game.vue';
import PlayerColor from './new-game/fields/player-color.vue';
import PlayerName from './new-game/fields/player-name.vue';
import RemovePlayerButton from './new-game/buttons/remove-player.vue';

export default {
  components: {
    AddPlayerButton,
    CreateGameButton,
    PlayerColor,
    PlayerName,
    RemovePlayerButton,
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    isLoading: false,

    minPlayers: null,
    maxPlayers: null,
    colors: [],

    players: [],
  }),

  created() {
    this.minPlayers = this.game.minPlayers;
    this.maxPlayers = this.game.maxPlayers;

    this.game.playerColors.forEach((color) => this.colors.push({
      id: color.id,
      name: color.name,
    }));

    for (let i = 0; i < this.minPlayers; i += 1) {
      this.addPlayer();
    }
  },

  methods: {
    addPlayer() {
      this.players.push({ name: '', colorId: '' });
    },
    removePlayer(index) {
      this.players = this.players.filter((_, i) => i !== index);
    },
    createGame() {
      const now = new Date();
      const game = {
        id: now.valueOf(),
        gameTypeId: this.game.id,
        created: now.toISOString(),
        players: this.players,
      };
      storage.push('games', game);
    },
  },

  computed: {
    canAddPlayer() {
      return this.players.length < this.maxPlayers;
    },
    canRemovePlayer() {
      return this.players.length > this.minPlayers;
    },
    selectedColorIds() {
      const colorIds = new Set();
      this.players.forEach((player) => {
        const { colorId } = player;
        if (colorId) colorIds.add(colorId);
      });
      return colorIds;
    },
    availableColors() {
      return this.colors.filter((color) => !this.selectedColorIds.has(color.id));
    },
  },
};
</script>
