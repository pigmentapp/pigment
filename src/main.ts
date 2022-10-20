import Vue from 'vue';
import PortalVue from 'portal-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import AppButton from './components/AppButton.vue';
import AppContent from './components/AppContent.vue';
import AppContentSection from './components/AppContentSection.vue';
import AppFormCheckbox from './components/AppFormCheckbox.vue';
import AppFormElement from './components/AppFormElement.vue';
import AppFormInput from './components/AppFormInput.vue';
import AppFormTextEditor from './components/AppFormTextEditor.vue';
import AppHeading from './components/AppHeading.vue';
import AppIcon from './components/AppIcon.vue';
import AppTabs from './components/AppTabs.vue';

import './utils/pluginProductInfo';

Vue.use(PortalVue);

Vue.config.productionTip = false;

Vue.component('AppButton', AppButton);
Vue.component('AppContent', AppContent);
Vue.component('AppContentSection', AppContentSection);
Vue.component('AppFormCheckbox', AppFormCheckbox);
Vue.component('AppFormElement', AppFormElement);
Vue.component('AppFormInput', AppFormInput);
Vue.component('AppFormTextEditor', AppFormTextEditor);
Vue.component('AppHeading', AppHeading);
Vue.component('AppIcon', AppIcon);
Vue.component('AppTabs', AppTabs);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
