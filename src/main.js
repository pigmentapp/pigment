import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import AppButton from './components/AppButton.vue';

import './assets/css/main.css';

/* if (!process.env.IS_WEB) */ Vue.use(require('vue-electron'));

Vue.config.productionTip = false;

Vue.component('AppButton', AppButton);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
