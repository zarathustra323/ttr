<template>
  <div class="list-group list-group-flush">
    <total-score class="list-group-item py-3" :score="player.score" :color-id="player.color.id" />
    <routes-table
      class="list-group-item py-3"
      :routes="routes"
      :nodes="allNodes"
      :edges="allEdges"
      @claim="claimRoute"
      @remove="$emit('remove-edge', { player, edge: $event })"
    />
    <tickets-table
      class="list-group-item py-3"
      :tickets="tickets"
      :nodes="allTicketNodes"
      :edges="allTicketEdges"
      @claim="claimTicket"
      @remove="$emit('remove-ticket', { player, edge: $event })"
    />
  </div>
</template>

<script>
import RoutesTable from './routes-table.vue';
import TicketsTable from './tickets-table.vue';
import TotalScore from './total-score.vue';

export default {
  emits: ['claim-edge', 'remove-edge', 'claim-ticket', 'remove-ticket'],

  components: {
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
    },
    claimTicket({ edge }) {
      this.$emit('claim-ticket', { player: this.player, edge });
    },
  },
};
</script>
