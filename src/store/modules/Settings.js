import Connection from '@/db';

const db = new Connection({
  file: 'settings.json',
  defaults: {
    'dimmer.dimDelayInMs': 5000,
    'dimmer.dimIfWindowIsNotInFocus': false,
    'layout.sideBarLocation': 'left',
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
