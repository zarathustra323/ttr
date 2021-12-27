<template>
  <ul class="nav nav-tabs card-header-tabs">
    <li class="d-md-none nav-item dropdown">
      <a
        class="py-3 d-flex align-items-center nav-link active dropdown-toggle"
        data-bs-toggle="dropdown"
        href="#select-player"
        role="button"
        aria-expanded="false"
      >
        <nav-item :player="activePlayer" badge-container-class="me-2" />
      </a>
      <ul class="dropdown-menu border-top-0 mt--2px">
        <li v-for="[colorId, player] in inactivePlayers" :key="colorId">
          <a
            class="py-3 dropdown-item d-flex align-items-center"
            :href="`#${colorId}`"
            @click.prevent="$emit('select-player', colorId)"
          >
            <nav-item :player="player" />
          </a>
        </li>
      </ul>
    </li>

    <li v-for="[colorId, player] in players" :key="colorId" class="d-none d-md-block">
      <a
        :class="`py-3 d-flex align-items-center nav-link ${activeClass(colorId)}`"
        :href="`#${colorId}`"
        @click.prevent="$emit('select-player', colorId)"
      >
        <nav-item :player="player" />
      </a>
    </li>
  </ul>
</template>

<script>
import NavItem from './player-nav/nav-item.vue';

export default {
  emits: ['select-player'],
  components: { NavItem },
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

  computed: {
    activePlayer() {
      return this.players.get(this.activeColorId);
    },
    inactivePlayers() {
      const map = new Map();
      this.players.forEach((player, colorId) => {
        if (colorId === this.activeColorId) return;
        map.set(colorId, player);
      });
      return map;
    },
  },

  methods: {
    activeClass(colorId) {
      return this.activeColorId === colorId ? 'active' : '';
    },
  },
};
</script>
