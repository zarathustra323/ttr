<template>
  <div class="card-body">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li
          v-for="item in breadcrumbs"
          :key="item.name"
          :class="`breadcrumb-item ${item.active ? 'active' : ''}`"
        >
          <a v-if="!item.active" href="#" @click.prevent="item.method">
            {{ item.name }}
          </a>
          <span v-else>
            {{ item.name }}
          </span>
        </li>
      </ol>
    </nav>

    <div v-if="step === 1">
      <div class="d-flex flex-wrap gap-3">
        <button
          v-for="node in fromNodes"
          :key="node.id"
          type="button"
          class="btn btn-outline-secondary"
          @click="fromNode = node"
        >
          {{ node.name }}
        </button>
      </div>
    </div>
    <div v-if="step === 2">
      <div class="d-flex flex-wrap gap-3">
        <destination-button
          v-for="destination in destinations"
          :key="destination.edge.id"
          :node="destination.node"
          :edge="destination.edge"
          @click="$emit('select', destination)"
        />
      </div>
    </div>
  </div>
  <div class="card-footer justify-content-end d-flex">
    <button type="button" class="btn btn-outline-danger" @click="$emit('cancel')">
      Cancel
    </button>
  </div>
</template>

<script>
import DestinationButton from './destination-button.vue';

export default {
  emits: ['select', 'cancel'],

  components: {
    DestinationButton,
  },

  props: {
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
    fromNode: null,
  }),

  computed: {
    breadcrumbs() {
      const { step } = this;
      if (step === 1) return [{ name: 'From', active: true }];
      return [
        { name: `From ${this.fromNode.name}`, active: false, method: this.goToStep1 },
        { name: 'To', active: true },
      ];
    },
    fromNodes() {
      return [...this.nodes.values()].sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    },
    destinations() {
      const destinations = [];
      this.fromNode.neighbors.forEach((edgeIds, nodeId) => {
        const node = this.nodes.get(nodeId);
        edgeIds.forEach((edgeId) => {
          const edge = this.edges.get(edgeId);
          destinations.push({ node, edge });
        });
      });
      return destinations.sort((a, b) => {
        const keyA = `${a.node.id}__${a.edge.data.color}`;
        const keyB = `${b.node.id}__${b.edge.data.color}`;
        if (keyA > keyB) return 1;
        if (keyA < keyB) return -1;
        return 0;
      });
    },
    step() {
      const { fromNode } = this;
      if (!fromNode) return 1;
      return 2;
    },
  },

  methods: {
    goToStep1() {
      this.fromNode = null;
    },
  },
};
</script>
