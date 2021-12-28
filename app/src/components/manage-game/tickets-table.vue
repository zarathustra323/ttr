<template>
  <div>
    <div class="d-flex justify-content-between align-items-end mb-3">
      <h5 class="card-title text-muted d-flex align-items-center lh-1">
        Tickets
        <span class="badge bg-secondary ms-2 pt-1-5">
          {{ tickets.length }}
        </span>
      </h5>

      <div>
        <button type="button" class="btn btn-primary" @click="isClaiming = !isClaiming">
          {{ isClaiming ? 'Cancel' : 'Claim' }}
        </button>
      </div>
    </div>

    <claim-ticket
      v-if="isClaiming"
      :nodes="nodes"
      :edges="edges"
      @select="claim"
    />

    <div class="table-responsive" v-else>
      <table v-if="tickets.length" class="table table-sm">
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
              <a href="#" @click.prevent="$emit('remove', ticket.edge)">
                Remove
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <small v-else class="d-block">
        No tickets claimed
      </small>
    </div>
  </div>
</template>

<script>
import ClaimTicket from './claim-ticket.vue';

export default {
  emits: ['claim', 'remove'],
  components: { ClaimTicket },
  props: {
    playerColorId: {
      type: String,
      required: true,
    },
    tickets: {
      type: Array,
      required: true,
    },
    nodes: {
      type: Map,
      required: true,
    },
    edges: {
      type: Map,
      required: true,
    },
  },

  data: () => ({
    isClaiming: false,
  }),

  watch: {
    playerColorId() {
      this.isClaiming = false;
    },
  },

  methods: {
    claim(...args) {
      this.isClaiming = false;
      this.$emit('claim', ...args);
    },
  },
};
</script>
