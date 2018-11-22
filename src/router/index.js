import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/tabs/:ident?',
      name: 'tabs',
      components: {
        aside: () => import(/* webpackChunkName: "tabs" */ '@/views/TabsNav.vue'),
        default: () => import(/* webpackChunkName: "tabs" */ '@/views/Tabs.vue'),
      },
      children: [
        {
          path: '//',
          name: 'welcome',
          component: () => import(/* webpackChunkName: "welcome" */ '@/views/Welcome.vue'),
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import(/* webpackChunkName: "notifications" */ '@/views/Notifications.vue'),
        },
      ],
    },
    {
      path: '/settings',
      name: 'settings',
      components: {
        aside: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
        default: () => import(/* webpackChunkName: "tabs" */ '@/views/Tabs.vue'),
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
  ],
});
