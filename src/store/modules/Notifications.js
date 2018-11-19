export default {
  namespaced: true,
  state: {
    notifications: [],
    preventOnBlur: false,
    scheduleActive: false,
    scheduleInMs: 1200000,
  },
  getters: {
    list({ notifications }) {
      return notifications;
    },
    preventOnBlur({ preventOnBlur }) {
      return preventOnBlur;
    },
    scheduleActive({ scheduleActive }) {
      return scheduleActive;
    },
    scheduleInMs({ scheduleInMs }) {
      return scheduleInMs;
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
    scheduleActive(state, yesNo) {
      state.scheduleActive = yesNo;
    },
    scheduleInMs(state, ms) {
      state.scheduleInMs = ms;
    },
  },
  actions: {
  },
};
