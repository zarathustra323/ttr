import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './app.vue';

import GameList from './pages/game-list.vue';
import NewGame from './pages/new-game.vue';

const routes = [
  { path: '/', component: GameList },
  { path: '/new-game/:gameId', component: NewGame },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
