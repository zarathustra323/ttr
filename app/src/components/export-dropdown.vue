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
      <li>
        <a class="dropdown-item" href="#export-data" @click.prevent="importData">
          Import
        </a>
      </li>
      <li><hr class="dropdown-divider"></li>
      <li>
        <a class="dropdown-item text-danger" href="#clear-all-data" @click.prevent="clearData">
          Clear All
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import storage from '../storage';

export default {
  emits: ['clear', 'import'],
  methods: {
    clearData() {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to clear ALL game data?')) {
        storage.clear();
        this.$emit('clear');
      }
    },

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

    importData() {
      const input = document.createElement('input');
      input.style.display = 'none';
      input.type = 'file';
      input.accept = 'application/json';

      const listener = input.addEventListener('change', (event) => {
        input.removeEventListener('change', listener);
        const [file] = event.target.files;
        const reader = new FileReader();
        reader.onload = ({ target }) => {
          const { result: json } = target;
          const data = JSON.parse(json);

          // merge game Ids
          const mergedIds = new Set([
            ...storage.getAsArray('gameIds'),
            ...data.gameIds,
          ]);
          // set each game
          Object.keys(data).filter((key) => /^game-/.test(key)).forEach((key) => {
            storage.set(key, data[key]);
          });
          // set the ids
          storage.set('gameIds', [...mergedIds]);
          this.$emit('import');
        };
        reader.readAsText(file);
      });

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    },
  },
};
</script>
