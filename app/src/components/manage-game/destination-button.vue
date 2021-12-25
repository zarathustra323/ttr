<template>
  <button
    type="button"
    class="btn btn-outline-secondary"
    :title="title"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script>
import Node from '../../../data/graph/node';
import Edge from '../../../data/graph/edge';

export default {
  props: {
    node: {
      type: Node,
      required: true,
    },
    edge: {
      type: Edge,
      required: true,
    },
  },

  computed: {
    claimedBy() {
      return this.edge.data.claimedBy;
    },
    label() {
      return `${this.node.name} (${this.edge.data.color})`;
    },
    title() {
      const { claimedBy } = this;
      if (claimedBy) return `Claimed by ${claimedBy.name}`;
      return this.label;
    },
    disabled() {
      return Boolean(this.claimedBy);
    },
  },
};
</script>
