import Vue from 'vue';
import { name, productName, version } from '@/../package.json';

Vue.use({
  install(vue) {
    const V = vue;
    V.prototype.$productInfo = {
      name,
      productName,
      version,
    };
  },
});
