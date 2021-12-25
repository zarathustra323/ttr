<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-0">
        {{ player.name }}
        [<span :style="`color: var(--bs-${player.color.id})`">{{ player.color.name }}</span>]
      </h5>
    </div>
    <div class="card-header">
      <player-nav :active-key="activeTabKey" @click="activeTabKey = $event" />
    </div>
    <claim-route
      v-if="activeTabKey === 'claim-route'"
      :nodes="allNodes"
      :edges="allEdges"
      @select="claimRoute"
      @cancel="activeTabKey = 'info'"
    />
    <div v-else class="card-body">
      Info
    </div>
  </div>
</template>

<script>
import ClaimRoute from './claim-route.vue';
import PlayerNav from './player-nav.vue';

export default {
  components: {
    ClaimRoute,
    PlayerNav,
  },
  props: {
    player: {
      type: Object,
      required: true,
    },
    allEdges: {
      type: Map,
      required: true,
    },
    allNodes: {
      type: Map,
      required: true,
    },
  },

  data: () => ({
    activeTabKey: 'info',
  }),

  methods: {
    claimRoute({ edge }) {
      console.log(edge);
    },
  },
};
</script>
