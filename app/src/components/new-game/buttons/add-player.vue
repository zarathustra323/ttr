<template>
  <button
    type="button"
    class="btn btn-primary"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  emits: ['click'],
  props: {
    label: {
      type: String,
      default: 'Add Player',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
