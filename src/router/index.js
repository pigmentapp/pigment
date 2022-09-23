import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
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
  ],
});
