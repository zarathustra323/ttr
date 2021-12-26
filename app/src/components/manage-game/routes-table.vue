<template>
  <div>
    <h5 class="card-title text-muted">
      Routes
    </h5>
    <table v-if="routes.length" class="table table-sm">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Color</th>
          <th>Length</th>
          <th>Points</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="route in routes" :key="route.id">
          <td>{{ route.from.name }}</td>
          <td>{{ route.to.name }}</td>
          <td>{{ route.color }}</td>
          <td>{{ route.length }}</td>
          <td>{{ route.points }}</td>
          <td>
            <a href="#" @click.prevent="$emit('remove', route.edge)">
              Remove
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <small v-else class="d-block">
      No routes claimed
    </small>
  </div>
</template>

<script>
export default {
  emits: ['remove'],
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
};
</script>
