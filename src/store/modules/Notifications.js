export default {
  namespaced: true,
  state: {
    notifications: [],
    preventOnBlur: false,
  },
  getters: {
    list({ notifications }) {
      return notifications;
    },
    preventOnBlur({ preventOnBlur }) {
      return preventOnBlur;
    },
  },
  mutations: {
    add(state, { tab, notification }) {
      state.notifications.push({
        notification,
        tab,
        timestamp: Date.now(),
      });
    },
    preventOnBlur(state, yesNo) {
      state.preventOnBlur = yesNo;
    },
  },
  actions: {
  },
};
