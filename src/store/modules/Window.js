export default {
  namespaced: true,
  state: {
    hasFocus: true,
  },
  getters: {
    hasFocus({ hasFocus }) {
      return hasFocus;
    },
  },
  mutations: {
    setHasFocus(state, yesNo) {
      state.hasFocus = yesNo;
    },
  },
  actions: {
  },
};
