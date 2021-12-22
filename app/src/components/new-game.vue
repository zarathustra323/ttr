<template>
  <form @submit.prevent="createGame">
    <div v-for="(player, index) in players" :key="index" class="card mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="card-title mb-3">
            Player {{ index + 1 }}
          </h5>

          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            :disabled="!canRemovePlayer"
            @click="removePlayer(index)"
          >
            Remove
          </button>
        </div>
        <div class="row">
          <div class="col-sm-6 mb-2 mb-sm-0">
            <label :for="`player-name-${index}`">Name</label>
            <input
              v-model="player.name"
              :id="`player-name-${index}`"
              type="text"
              class="form-control"
              required
            >
          </div>

          <div class="col-sm-6">
            <label :for="`player-color-${index}`">Color</label>

            <div v-if="player.colorId" class="input-group">
              <input
                :value="game.playerColors.get(player.colorId).name"
                :id="`player-color-${index}`"
                class="form-control"
                disabled
              >
              <button
                class="btn btn-outline-secondary"
                type="button"
                title="Clear selected color"
                @click="clearColor(player)"
              >
                &times;
              </button>
            </div>

            <select
              v-else
              :value="player.colorId"
              :id="`player-color-${index}`"
              class="form-select"
              aria-label="Player Color"
              required
              @input="setColor(player, $event)"
            >
              <option value="">
                Select...
              </option>
              <option v-for="color in availableColors" :key="color.id" :value="color.id">
                {{ color.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-primary"
        :disabled="!canAddPlayer"
        @click="addPlayer"
      >
        Add Player
      </button>
      <button type="submit" class="btn btn-success">
        Create Game
      </button>
    </div>
  </form>
</template>

<script>
import storage from '../storage';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
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
    clearColor(player) {
      // eslint-disable-next-line no-param-reassign
      player.colorId = '';
    },
    setColor(player, event) {
      const { value } = event.target;
      // eslint-disable-next-line no-param-reassign
      player.colorId = value || '';
    },
    createGame() {
      const now = new Date();
      const game = {
        id: now.valueOf(),
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
