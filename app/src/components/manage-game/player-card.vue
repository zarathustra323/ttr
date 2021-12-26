<template>
  <div class="card">
    <div class="card-header border-0 pt-3">
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
    <claim-ticket
      v-else-if="activeTabKey === 'claim-ticket'"
      :nodes="allTicketNodes"
      :edges="allTicketEdges"
      @select="claimTicket"
      @cancel="activeTabKey = 'info'"
    />
    <div v-else class="list-group list-group-flush">
      <total-score class="list-group-item py-3" :score="player.score" />
      <routes-table
        class="list-group-item py-3"
        :routes="routes"
        @remove="$emit('remove-edge', { player, edge: $event })"
      />
      <tickets-table
        class="list-group-item py-3"
        :tickets="tickets"
        @remove="$emit('remove-ticket', { player, edge: $event })"
      />
    </div>
  </div>
</template>

<script>
import ClaimRoute from './claim-route.vue';
import ClaimTicket from './claim-ticket.vue';
import PlayerNav from './player-nav.vue';
import RoutesTable from './routes-table.vue';
import TicketsTable from './tickets-table.vue';
import TotalScore from './total-score.vue';

export default {
  emits: ['claim-edge', 'remove-edge', 'claim-ticket', 'remove-ticket'],

  components: {
    ClaimRoute,
    ClaimTicket,
    PlayerNav,
    RoutesTable,
    TicketsTable,
    TotalScore,
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
    allTicketEdges: {
      type: Map,
      required: true,
    },
    allTicketNodes: {
      type: Map,
      required: true,
    },
  },

  data: () => ({
    activeTabKey: 'info',
  }),

  computed: {
    edges() {
      return this.player.graph.edges;
    },
    ticketEdges() {
      return this.player.ticketGraph.edges;
    },
    routes() {
      const routes = [];
      this.edges.forEach((edge) => {
        const { color, points, length } = edge.data;
        const fromNode = this.allNodes.get(edge.fromId);
        const toNode = this.allNodes.get(edge.toId);

        routes.push({
          id: edge.id,
          edge,
          from: fromNode,
          to: toNode,
          color,
          points,
          length,
        });
      });
      return routes.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
    },
    tickets() {
      const tickets = [];
      this.ticketEdges.forEach((edge) => {
        const { points, resolvedPoints } = edge.data;
        const fromNode = this.allTicketNodes.get(edge.fromId);
        const toNode = this.allTicketNodes.get(edge.toId);

        tickets.push({
          id: edge.id,
          edge,
          from: fromNode,
          to: toNode,
          points,
          resolvedPoints,
        });
      });
      return tickets.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
    },
  },

  methods: {
    claimRoute({ edge }) {
      this.$emit('claim-edge', { player: this.player, edge });
      this.activeTabKey = 'info';
    },
    claimTicket({ edge }) {
      this.$emit('claim-ticket', { player: this.player, edge });
      this.activeTabKey = 'info';
    },
  },
};
</script>
