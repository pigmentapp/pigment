import Vue from 'vue';
import VueElectron from 'vue-electron';
import PortalVue from 'portal-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import AppButton from './components/AppButton.vue';
import AppContent from './components/AppContent.vue';
import AppHeading from './components/AppHeading.vue';
import AppIcon from './components/AppIcon.vue';

Vue.use(VueElectron);
Vue.use(PortalVue);

Vue.config.productionTip = false;

Vue.component('AppButton', AppButton);
Vue.component('AppContent', AppContent);
Vue.component('AppHeading', AppHeading);
Vue.component('AppIcon', AppIcon);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
