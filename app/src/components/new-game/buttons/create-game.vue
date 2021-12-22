<template>
  <button :type="type" :disabled="disabled" class="btn btn-success">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Create Game',
    },
    type: {
      type: String,
      default: 'submit',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
