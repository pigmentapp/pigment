export default {
  namespaced: true,
  state: {
    hasFocus: true,
    timestampOfBlur: 0,
    mainBoundingClientRect: new DOMRect(),
  },
  getters: {
    hasFocus({ hasFocus }) {
      return hasFocus;
    },
    timestampOfBlur({ timestampOfBlur }) {
      return timestampOfBlur;
    },
    mainBoundingClientRect({ mainBoundingClientRect }) {
      return mainBoundingClientRect;
    },
  },
  mutations: {
    hasFocus(state, { yesNo, timestamp }) {
      state.hasFocus = yesNo;
      state.timestampOfBlur = yesNo ? 0 : timestamp;
    },
    setMainBoundingClientRect(state, rect) {
      state.mainBoundingClientRect = rect;
    },
  },
  actions: {
    hasFocus({ commit, dispatch }, yesNo) {
      const timestamp = Date.now();

      commit('hasFocus', { yesNo, timestamp });
      dispatch('Notifications/calcNextSchedule', null, { root: true });
    },
  },
};
