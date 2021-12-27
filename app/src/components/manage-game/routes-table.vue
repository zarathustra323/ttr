<template>
  <div>
    <div class="d-flex justify-content-between align-items-end">
      <h5 class="card-title text-muted d-flex align-items-center lh-1">
        Routes
        <span class="badge bg-secondary ms-2 pt-1-5">
          {{ routes.length }}
        </span>
      </h5>

      <div>
        <button type="button" class="btn btn-primary" @click="isClaiming = !isClaiming">
          {{ isClaiming ? 'Cancel' : 'Claim' }}
        </button>
      </div>
    </div>

    <claim-route
      v-if="isClaiming"
      :nodes="nodes"
      :edges="edges"
      @select="claim"
    />

    <div v-else>
      <table v-if="routes.length" class="table table-sm">
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
              <a href="#" @click.prevent="$emit('remove', route.edge)">
                <span class="d-none d-sm-inline">
                  Remove
                </span>
                <span class="d-sm-none">
                  &times;
                </span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <small v-else class="d-block">
        No routes claimed
      </small>
    </div>
  </div>
</template>

<script>
import ClaimRoute from './claim-route.vue';

export default {
  emits: ['claim', 'remove'],
  components: { ClaimRoute },
  props: {
    routes: {
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

  methods: {
    claim(...args) {
      this.isClaiming = false;
      this.$emit('claim', ...args);
    },
  },
};
</script>
