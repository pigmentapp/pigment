function nextScheduleIs(timeOfWindowBlur, notificationSchedule) {
  const nextSchedule = timeOfWindowBlur + notificationSchedule;

  if (nextSchedule <= Date.now()) {
    return nextScheduleIs(nextSchedule, notificationSchedule);
  }

  return nextSchedule;
}

export default {
  namespaced: true,
  state: {
    notifications: [],
    nextSchedule: 0,
    preventOnBlur: false,
    scheduleActive: false,
    scheduleInMs: 1200000,
  },
  getters: {
    list({ notifications }) {
      return notifications;
    },
    listAfterTimestamp({ notifications }) {
      return timestamp => notifications.filter(item => item.timestamp > timestamp);
    },
    nextSchedule({ nextSchedule }) {
      return nextSchedule;
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
    add(state, { tabIdent, notification }) {
      state.notifications.push({
        notification,
        tabIdent,
        timestamp: Date.now(),
      });
    },
    nextSchedule(state, schedule) {
      state.nextSchedule = schedule;
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
    calcNextSchedule(store) {
      const timeOfWindowBlur = store.rootGetters['Window/timestampOfBlur'];
      const notificationSchedule = store.getters.scheduleInMs;

      if (timeOfWindowBlur) {
        const nextSchedule = nextScheduleIs(timeOfWindowBlur, notificationSchedule);
        store.commit('nextSchedule', nextSchedule);
      }
    },
  },
};
