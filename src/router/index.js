import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import(/* webpackChunkName: "welcome" */ '@/views/Welcome.vue'),
    },
    {
      path: '/tabs/create',
      name: 'tabs-create',
      component: () => import(/* webpackChunkName: "tabs" */ '@/views/TabCreate.vue'),
    },
    {
      path: '/tabs/:id/edit',
      name: 'tabs-edit',
      component: () => import(/* webpackChunkName: "tabs" */ '@/views/TabEdit.vue'),
    },
    {
      path: '/tabs/:id?',
      name: 'tabs',
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import(/* webpackChunkName: "notifications" */ '@/views/Notifications.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: () => import(/* webpackChunkName: "changelog" */ '@/views/Changelog.vue'),
    },
  ],
});
