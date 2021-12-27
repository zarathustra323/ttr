import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './app.vue';

import GameList from './pages/game-list.vue';
import NewGame from './pages/new-game.vue';
import ManageGame from './pages/manage-game.vue';
import NotFound from './pages/not-found.vue';

const routes = [
  { path: '/', component: GameList },
  { path: '/new-game/:typeId', component: NewGame },
  { path: '/game/:gameId', component: ManageGame },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
