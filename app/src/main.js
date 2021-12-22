import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './app.vue';

import IndexPage from './pages/index-page.vue';
import NewGame from './pages/new-game.vue';

const routes = [
  { path: '/', component: IndexPage },
  { path: '/new-game/:gameId', component: NewGame },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
