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
      <h4>Actions</h4>
      <div class="d-inline-flex flex-column gap-2">
        <button type="button" class="btn btn-primary">
          Claim Route
        </button>
        <button type="button" class="btn btn-primary">
          Verify Ticket
        </button>
      </div>
    </div>
    <div class="col-lg-6">
      <h4>Players</h4>
      <div class="d-grid gap-3">
        <div v-for="[colorId, player] in game.players" class="card" :key="colorId">
          <div class="card-header d-flex justify-content-between">
            {{ player.name }}
            <span>
              [<span :style="`color: var(--bs-${colorId})`">{{ colorId }}</span>]
            </span>
          </div>
          <div class="card-body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from '../game';
import storage from '../storage';
import dayjs from '../dayjs';
import gameData from '../../data';

export default {
  data: () => ({
    game: null,
  }),

  created() {
    const serialized = storage.get(`game-${this.$route.params.gameId}`);
    const game = Game.deserialize(serialized);
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
