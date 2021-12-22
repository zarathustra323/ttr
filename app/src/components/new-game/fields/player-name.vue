<template>
  <label :for="fieldId">Name</label>
  <input
    :value="modelValue"
    :id="fieldId"
    type="text"
    class="form-control"
    required
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  emits: ['update:modelValue'],

  props: {
    index: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    fieldId() {
      return `player${this.index}-name`;
    },
  },
};
</script>
