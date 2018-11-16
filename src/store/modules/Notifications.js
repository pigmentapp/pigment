export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  getters: {
    list({ notifications }) {
      return notifications;
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
  },
  actions: {
  },
};
