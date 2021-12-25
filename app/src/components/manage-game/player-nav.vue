<template>
  <ul class="nav nav-tabs card-header-tabs">
    <li v-for="item in items" :key="item.key">
      <a
        :class="`nav-link ${activeKey === item.key ? 'active' : ''}`"
        :href="`#${item.key}`"
        @click.prevent="$emit('click', item.key)"
      >
        {{ item.label }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['click'],
  props: {
    activeKey: {
      type: String,
      default: 'info',
    },
  },
  data: () => ({
    items: [
      { key: 'info', label: 'Info' },
      { key: 'claim-route', label: 'Claim Route' },
    ],
  }),
};
</script>
