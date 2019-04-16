import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import modules from './modules';

Vue.use(Vuex);

const localStorageState = new VuexPersistence({
  modules: ['Settings'],
});

export default new Vuex.Store({
  modules,
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    localStorageState.plugin,
  ],
});
