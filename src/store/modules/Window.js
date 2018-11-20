export default {
  namespaced: true,
  state: {
    hasFocus: true,
    timestampOfBlur: 0,
  },
  getters: {
    hasFocus({ hasFocus }) {
      return hasFocus;
    },
    timestampOfBlur({ timestampOfBlur }) {
      return timestampOfBlur;
    },
  },
  mutations: {
    hasFocus(state, { yesNo, timestamp }) {
      state.hasFocus = yesNo;
      state.timestampOfBlur = yesNo ? 0 : timestamp;
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
