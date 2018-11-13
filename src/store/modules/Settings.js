export default {
  namespaced: true,
  state: {
    isDimActive: true,
  },
  getters: {
    isDimActive({ isDimActive }) {
      return isDimActive;
    },
    invertedLayout() {
      return process.platform !== 'darwin';
    },
  },
  mutations: {
    setDimActive(state, yesNo) {
      state.isDimActive = yesNo;
    },
  },
  actions: {
  },
};
