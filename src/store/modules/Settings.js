import Connection from '@/db';

const db = new Connection({
  file: 'settings.json',
  defaults: {
    'dimmer.dimDelayInMs': 5000,
    'dimmer.dimIfWindowIsNotInFocus': false,
    'layout.sideBarLocation': 'left',
    'navigation.displayHomeButton': true,
    'navigation.displayTabLabels': true,
    'navigation.indicatorBadgeColor': 'gray',
    'navigation.indicatorBadgeSize': 'normal',
    'notifications.holdBackIfWindowIsNotInFocus': false,
    'notifications.sendSummaryIfWindowIsNotInFocus': false,
    'notifications.summaryIntervalInMs': 1200000,
    'window.muteAudioIfWindowIsNotInFocus': false,
  },
});

export default {
  namespaced: true,
  state: {
    dbUpdated: Date.now(),
  },
  getters: {
    all({ dbUpdated }) {
      return db(dbUpdated).value();
    },
    byKey({ dbUpdated }) {
      return key => db(dbUpdated).get(key).value();
    },
    inGroup({ dbUpdated }) {
      return group => db(dbUpdated)
        .pickBy((v, k) => k.split('.')[0] === group)
        .mapKeys((v, k) => k.split('.').splice(1).join('.'))
        .value();
    },
  },
  mutations: {
    triggerDbUpdate(state) {
      state.dbUpdated = Date.now();
    },
  },
  actions: {
    set({ commit }, [key, value]) {
      db().set(key, value).write();
      commit('triggerDbUpdate');
    },
  },
};
