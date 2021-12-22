<template>
  <button
    type="button"
    class="btn btn-outline-secondary"
    title="Clear selected color"
    :disabled="disabled"
    @click="$emit('click', index)"
  >
    &times;
  </button>
</template>

<script>
export default {
  emits: ['click'],
  props: {
    index: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
