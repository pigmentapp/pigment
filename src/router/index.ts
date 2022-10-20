import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    components: {
      aside: () => import(/* webpackChunkName: "home" */ '@/views/HomeAsideView.vue'),
      default: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
    },
  },
  {
    path: '/tabs/create',
    name: 'tabs-create',
    component: () => import(/* webpackChunkName: "tabs" */ '@/views/TabCreateView.vue'),
  },
  {
    path: '/tabs/:id/edit',
    name: 'tabs-edit',
    component: () => import(/* webpackChunkName: "tabs" */ '@/views/TabEditView.vue'),
  },
  {
    path: '/tabs/:id?',
    name: 'tabs',
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/SettingsView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
