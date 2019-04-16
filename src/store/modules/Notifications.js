import Connection from '@/db';

const db = new Connection({
  file: 'notifications.json',
  defaults: { notifications: [] },
});

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
    nextSchedule: 0,
    preventOnBlur: false,
    scheduleActive: false,
    scheduleInMs: 1200000,
    dbUpdated: Date.now(),
  },
  getters: {
    list: ({ dbUpdated }) => ({ newerThanTimestamp } = {}) => {
      const items = db(dbUpdated).get('notifications');

      if (newerThanTimestamp) {
        items.filter(item => item.timestamp > newerThanTimestamp);
      }

      return items.orderBy('timestamp', 'desc').value();
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
      db().get('notifications')
        .push({
          notification,
          tabIdent,
          timestamp: Date.now(),
        })
        .write();

      state.dbUpdated = Date.now();
    },
    removeAll(state) {
      db().get('notifications').remove().write();
      state.dbUpdated = Date.now();
    },
    removeItem(state, item) {
      db().get('notifications').remove(i => i === item).write();
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
