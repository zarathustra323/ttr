<template>
  <div class="dropdown">
    <button
      class="btn btn-success dropdown-toggle"
      type="button"
      id="new-game-dropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="d-none d-md-inline">
        New Game
      </span>
      <span class="d-md-none">
        New
      </span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="new-game-dropdown">
      <li v-for="[gameId, game] in gameData" :key="gameId">
        <router-link :to="`/new-game/${gameId}`" class="dropdown-item">
          {{ game.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import gameData from '../../data';

export default {
  data: () => ({ gameData }),
};
</script>
