import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    activeIdent: 0,
    list: [],
  },
  getters: {
    active(state) {
      const { activeIdent, list } = state;
      return list.find(item => item.ident === activeIdent) || {};
    },
    list(state) {
      return state.list;
    },
  },
  mutations: {
    activateIdent(state, ident) {
      state.activeIdent = ident;
    },
    add({ list }, { ident, label, url }) {
      list.push({
        ident,
        label,
        url,
        title: '',
        favicon: '',
      });
    },
    setList(state, items) {
      state.list = items;
    },
    update({ list }, { ident, data }) {
      const index = list.findIndex(item => item.ident === ident);
      const item = list[index];

      Vue.set(list, index, {
        ...item,
        ...data,
      });
    },
  },
  actions: {
    add({ commit }, payload) {
      const ident = Date.now();
      commit('add', { ident, ...payload });
      commit('activateIdent', ident);
    },
  },
};
