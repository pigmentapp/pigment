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
    add(state, { options, title }) {
      state.notifications.push({
        timestamp: Date.now(),
        options,
        title,
      });
    },
  },
  actions: {
  },
};
