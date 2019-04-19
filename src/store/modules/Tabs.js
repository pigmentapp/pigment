import Connection from '@/db';

const db = new Connection({
  file: 'tabs.json',
  defaults: {
    tabs: [],
    sorting: [],
  },
});

export default {
  namespaced: true,
  state: {
    activeId: 0,
    dbUpdated: Date.now(),
  },
  getters: {
    active({ activeId, dbUpdated }) {
      return db(dbUpdated).get('tabs').find(item => item.id === activeId).value() || {};
    },
    byId({ dbUpdated }) {
      return id => db(dbUpdated).get('tabs').find(item => item.id === id).value() || {};
    },
    list({ dbUpdated }) {
      return db(dbUpdated)
        .get('tabs')
        .cloneDeep()
        .value();
    },
    listSorted({ dbUpdated }, { list }) {
      const sorting = db(dbUpdated).get('sorting').value();

      return [...list].sort((a, b) => sorting.indexOf(a.id) - sorting.indexOf(b.id));
    },
  },
  mutations: {
    activateId(state, id) {
      state.activeId = id;
      state.dbUpdated = Date.now();
    },
    create(state, item) {
      db()
        .get('tabs')
        .push(item)
        .write();

      db()
        .get('sorting')
        .push(item.id)
        .write();

      state.dbUpdated = Date.now();
    },
    delete(state, item) {
      db()
        .get('tabs')
        .remove(i => i.id === item.id)
        .write();

      db()
        .get('sorting')
        .remove(i => i === item.id)
        .write();

      state.activateId = 0;
      state.dbUpdated = Date.now();
    },
    setSorting(state, items) {
      db().set('sorting', items.map(item => item.id)).write();
      state.dbUpdated = Date.now();
    },
    update(state, { id, data }) {
      db()
        .get('tabs')
        .find(i => i.id === id).assign(data)
        .write();

      state.dbUpdated = Date.now();
    },
  },
  actions: {
    create({ commit }, payload = {}) {
      const id = Date.now();
      const item = {
        id,
        ...payload,
      };
      commit('create', item);
      return item;
    },
  },
};
