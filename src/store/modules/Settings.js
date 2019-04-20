export default {
  namespaced: true,
  state: {
    isDimActive: false,
    isLayoutInverted: false,
    muteOnWindowBlur: false,
  },
  getters: {
    isDimActive({ isDimActive }) {
      return isDimActive;
    },
    isLayoutInverted({ isLayoutInverted }) {
      return isLayoutInverted;
    },
    muteOnWindowBlur({ muteOnWindowBlur }) {
      return muteOnWindowBlur;
    },
  },
  mutations: {
    setDimActive(state, yesNo) {
      state.isDimActive = yesNo;
    },
    setLayoutInverted(state, yesNo) {
      state.isLayoutInverted = yesNo;
    },
    setMuteOnWindowBlur(state, yesNo) {
      state.muteOnWindowBlur = yesNo;
    },
  },
  actions: {
  },
};
