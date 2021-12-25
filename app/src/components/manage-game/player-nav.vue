<template>
  <ul class="nav nav-tabs card-header-tabs">
    <li v-for="item in items" :key="item.key">
      <a
        :class="`nav-link ${activeKey === item.key ? 'active' : ''}`"
        :href="`#${item.key}`"
        @click.prevent="setActiveItem(item.key)"
      >
        {{ item.label }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['click'],
  data: () => ({
    items: [
      { key: 'info', label: 'Info' },
      { key: 'claim-route', label: 'Claim Route' },
    ],
    activeKey: 'info',
  }),

  methods: {
    setActiveItem(key) {
      this.activeKey = key;
      this.$emit('click', key);
    },
  },
};
</script>
