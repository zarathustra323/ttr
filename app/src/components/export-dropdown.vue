<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="data-dropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Data
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="new-game-dropdown">
      <li>
        <a class="dropdown-item" href="#export-data" @click.prevent="exportData">
          Export
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import storage from '../storage';

export default {
  methods: {
    exportData() {
      const gameIds = storage.getAsArray('gameIds');
      const games = gameIds.reduce((o, id) => {
        const key = `game-${id}`;
        const game = storage.get(key);
        return { ...o, [key]: game };
      }, {});

      const o = {
        gameIds,
        ...games,
      };
      const blob = new Blob([JSON.stringify(o)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.setAttribute('download', `ttr-export-${Date.now()}.json`);
      if (typeof a.download === 'undefined') {
        a.setAttribute('target', '_blank');
      }

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    },
  },
};
</script>
