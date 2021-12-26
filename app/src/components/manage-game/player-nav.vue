<template>
  <ul class="nav nav-tabs card-header-tabs">
    <li v-for="[colorId, player] in players" :key="colorId">
      <a
        :class="`pt-3 d-flex nav-link ${activeColorId === colorId ? 'active' : ''}`"
        :href="`#${colorId}`"
        @click.prevent="$emit('select-player', colorId)"
      >
        <div class="d-none d-sm-block h5 me-2">{{ player.name }}</div>
        <div class="d-sm-none">{{ player.name }}</div>
        <div class="d-none d-sm-block">
          <span class="badge" :style="`background-color: var(--bs-${player.color.id})`">
            {{ player.score.pieces + player.score.tickets }}
          </span>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['select-player'],
  props: {
    players: {
      type: Map,
      required: true,
    },
    activeColorId: {
      type: String,
      required: true,
    },
  },
};
</script>
