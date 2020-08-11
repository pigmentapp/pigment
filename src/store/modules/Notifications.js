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
    dbUpdated: Date.now(),
  },
  getters: {
    list: ({ dbUpdated }) => ({ newerThanTimestamp } = {}) => {
      let items = db(dbUpdated).get('notifications');

      if (newerThanTimestamp) {
        items = items.filter(item => item.timestamp > newerThanTimestamp);
      }

      return items.orderBy('timestamp', 'desc').value();
    },
    nextSchedule({ nextSchedule }) {
      return nextSchedule;
    },
  },
  mutations: {
    add(state, { tabId, notification }) {
      const items = db().get('notifications')
        .push({
          notification,
          tabId,
          timestamp: Date.now(),
        })
        .takeRight(99)
        .value();

      db().set('notifications', items)
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
  },
  actions: {
    calcNextSchedule({ commit, rootGetters }) {
      const timeOfWindowBlur = rootGetters['Window/timestampOfBlur'];
      const notificationSchedule = rootGetters['Settings/byKey']('notifications.summaryIntervalInMs');

      if (timeOfWindowBlur) {
        const nextSchedule = nextScheduleIs(timeOfWindowBlur, notificationSchedule);
        commit('nextSchedule', nextSchedule);
      }
    },
  },
};
