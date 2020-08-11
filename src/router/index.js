import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        aside: () => import(/* webpackChunkName: "home" */ '@/views/HomeAside.vue'),
        default: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
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
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    },
  ],
});
