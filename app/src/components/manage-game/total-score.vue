<template>
  <div>
    <h5 class="card-title">
      <span class="text-muted">
        Total Score
      </span>
      {{ totalScore }}
    </h5>
    <div class="mb-3">
      <small class="d-block">
        Pieces: {{ score.pieces }}
      </small>
      <small class="d-block">
        Tickets: {{ score.tickets }}
      </small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
