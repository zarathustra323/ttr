<template>
  <button
    type="button"
    class="btn btn-outline-danger btn-sm"
    :disabled="disabled"
    @click="$emit('click', index)"
  >
    {{ label }}
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
    label: {
      type: String,
      default: 'Remove',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
