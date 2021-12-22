<template>
  <div class="card h-100">
    <div class="card-body flex-grow-0">
      <h5 class="card-title mb-0 flex-shrink-1">
        Type: {{ gameData.name }}
      </h5>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="player in players" :key="player.colorId" class="list-group-item">
        {{ player.name }}
        [<span :style="`color: var(--bs-${player.colorId})`">{{ player.colorId }}</span>]
      </li>
    </ul>
    <div class="card-body d-flex flex-column justify-content-end">
      <div class="d-flex justify-content-between">
        <router-link class="btn btn-sm btn-primary" role="button" :to="`/game/${game.id}`">
          Manage
        </router-link>
      </div>
    </div>
    <div class="card-footer">
      <small class="d-block text-muted">
        ID: {{ timestamp }}
      </small>
      <small class="d-block text-muted">
        Created: {{ createdDate }}
      </small>
    </div>
  </div>
</template>

<script>
import dayjs from '../dayjs';
import gameData from '../../data';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  computed: {
    gameTypeId() {
      return this.game.gameTypeId;
    },
    players() {
      return this.game.players;
    },
    timestamp() {
      return this.game.id;
    },
    createdDate() {
      const date = new Date(this.timestamp);
      return dayjs(date).format('MMM Do, YYYY @ HH:mma');
    },
    gameData() {
      return gameData.get(this.gameTypeId);
    },
  },
};
</script>
