import db from '@/db';

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
    dbUpdated: Date.now(),
  },
  getters: {
    list({ dbUpdated }) {
      // eslint-disable-next-line no-sequences
      return dbUpdated, db
        .get('notifications')
        .orderBy('timestamp', 'desc')
        .value();
    },
    listAfterTimestamp({ dbUpdated }) {
      // eslint-disable-next-line no-sequences
      return dbUpdated, timestamp => db
        .get('notifications')
        .filter(item => item.timestamp > timestamp)
        .orderBy('timestamp', 'desc')
        .value();
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
      db.get('notifications')
        .push({
          notification,
          tabIdent,
          timestamp: Date.now(),
        })
        .write();

      state.dbUpdated = Date.now();
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
