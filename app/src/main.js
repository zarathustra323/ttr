import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './app.vue';

import IndexPage from './pages/index-page.vue';
import AnotherPage from './pages/another-page.vue';

const routes = [
  { path: '/', component: IndexPage },
  { path: '/another-page', component: AnotherPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
