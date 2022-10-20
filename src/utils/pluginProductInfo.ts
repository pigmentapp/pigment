import Vue from 'vue';
import pkg from '@/../package.json';

const { name, productName, version } = pkg;

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
