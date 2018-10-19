export default {
  namespaced: true,
  state: {
    isDimActive: true,
  },
  getters: {
    isDimActive({ isDimActive }) {
      return isDimActive;
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
