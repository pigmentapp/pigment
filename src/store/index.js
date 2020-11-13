import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import modules from './modules';

Vue.use(Vuex);

const localStorageState = new VuexPersistence({
  modules: [],
});

export default new Vuex.Store({
  modules,
  state: {
    updateInfo: {},
  },
  mutations: {
    SET_UPDATE_INFO(state, payload) {
      state.updateInfo = payload;
    },
  },
  actions: {

  },
  plugins: [
    localStorageState.plugin,
  ],
});
