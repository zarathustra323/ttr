<template>
  <label :for="fieldId">Color</label>

  <div v-if="modelValue" class="input-group">
    <input
      :value="selectedColorName"
      :id="fieldId"
      class="form-control"
      disabled
    >
    <clear-color-button
      :index="index"
      :disabled="disabled"
      @click="$emit('update:modelValue', '')"
    />
  </div>

  <select
    v-else
    :value="modelValue"
    :id="fieldId"
    :disabled="disabled"
    class="form-select"
    aria-label="Player Color"
    required
    @input="emitColor"
  >
    <option value="">
      Select...
    </option>
    <option v-for="color in availableColors" :key="color.id" :value="color.id">
      {{ color.name }}
    </option>
  </select>
</template>

<script>
import ClearColorButton from '../buttons/clear-color.vue';

export default {
  emits: ['update:modelValue'],

  components: { ClearColorButton },

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
    allColors: {
      type: Map,
      required: true,
    },
    availableColors: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    fieldId() {
      return `player${this.index}-color`;
    },
    selectedColorName() {
      const color = this.allColors.get(this.modelValue);
      return color ? color.name : '';
    },
  },

  methods: {
    emitColor(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>
