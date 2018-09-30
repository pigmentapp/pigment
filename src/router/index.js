import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        header: () => import(/* webpackChunkName: "home" */ '@/components/TabHeader.vue'),
        aside: () => import(/* webpackChunkName: "home" */ '@/components/TabNav.vue'),
        default: Home,
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
