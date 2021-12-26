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
    <div v-else class="card-body">
      <h5 class="card-title">
        <span class="text-muted">
          Total Score
        </span>
        {{ totalScore }}
      </h5>
      <div class="mb-3">
        <small class="d-block">
          Pieces: {{ player.score.pieces }}
        </small>
        <small class="d-block">
          Tickets: {{ player.score.tickets }}
        </small>
      </div>

      <h5 class="card-title text-muted">
        Routes
      </h5>
      <table class="table table-sm">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Color</th>
            <th>Length</th>
            <th>Points</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="route in routes" :key="route.id">
            <td>{{ route.from.name }}</td>
            <td>{{ route.to.name }}</td>
            <td>{{ route.color }}</td>
            <td>{{ route.length }}</td>
            <td>{{ route.points }}</td>
            <td>
              <a href="#" @click.prevent="$emit('remove-edge', { player, edge: route.edge })">
                Remove
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <h5 class="card-title text-muted">
        Tickets
      </h5>
      <table class="table table-sm">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Points</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td>{{ ticket.from.name }}</td>
            <td>{{ ticket.to.name }}</td>
            <td>{{ ticket.edge.data.resolvedPoints }}</td>
            <td>
              <a href="#" @click.prevent="$emit('remove-ticket', { player, edge: ticket.edge })">
                Remove
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClaimRoute from './claim-route.vue';
import ClaimTicket from './claim-ticket.vue';
import PlayerNav from './player-nav.vue';

export default {
  emits: ['claim-edge', 'remove-edge', 'claim-ticket', 'remove-ticket'],

  components: {
    ClaimRoute,
    ClaimTicket,
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
    totalScore() {
      const { score } = this.player;
      return score.pieces + score.tickets;
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
