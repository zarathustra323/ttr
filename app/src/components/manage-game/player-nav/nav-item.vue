<template>
  <div class="h5 mb-0 me-2">
    {{ player.name }}
  </div>
  <div :class="badgeContainerClass">
    <span class="badge" :style="`background-color: var(--bs-${player.color.id})`">
      {{ player.score.pieces + player.score.tickets }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true,
    },
    badgeContainerClass: {
      type: String,
      default: null,
    },
  },
};
</script>;
