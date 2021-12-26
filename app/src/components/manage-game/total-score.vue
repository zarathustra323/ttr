<template>
  <div>
    <h4 class="card-title text-muted d-flex align-items-center lh-1">
      Total Score
      <div class="ms-2">
        <span class="badge pt-2" :style="`background-color: var(--bs-${colorId})`">
          {{ totalScore }}
        </span>
      </div>
    </h4>
    <small class="d-block">
      Pieces: {{ score.pieces }}
    </small>
    <small class="d-block">
      Tickets: {{ score.tickets }}
    </small>
  </div>
</template>

<script>
export default {
  props: {
    colorId: {
      type: String,
      required: true,
    },
    score: {
      type: Object,
      required: true,
    },
  },

  computed: {
    totalScore() {
      const { score } = this;
      return score.pieces + score.tickets;
    },
  },
};
</script>
