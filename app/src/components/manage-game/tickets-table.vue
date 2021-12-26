<template>
  <div>
    <h5 class="card-title text-muted">
      Tickets
    </h5>
    <table v-if="tickets.length" class="table table-sm">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Points</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.from.name }}</td>
          <td>{{ ticket.to.name }}</td>
          <td>{{ ticket.edge.data.resolvedPoints }}</td>
          <td>
            <a href="#" @click.prevent="$emit('remove', ticket.edge)">
              Remove
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <small v-else class="d-block">
      No tickets claimed
    </small>
  </div>
</template>

<script>
export default {
  emits: ['remove'],
  props: {
    tickets: {
      type: Array,
      required: true,
    },
  },
};
</script>
