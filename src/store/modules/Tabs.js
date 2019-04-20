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
      return db(dbUpdated).get('tabs').getById(activeId).value() || {};
    },
    byId({ dbUpdated }) {
      return id => db(dbUpdated).get('tabs').getById(id).value() || {};
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
    create(state, tab) {
      /*
        the actual tab creation is processed in action
        because mutations don't return values but we need the id
        to forward the user to the newly created tab
      */
      db()
        .get('sorting')
        .push(tab.id)
        .write();

      state.dbUpdated = Date.now();
    },
    delete(state, item) {
      db()
        .get('tabs')
        .removeById(item.id)
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
        .updateById(id, data)
        .write();

      state.dbUpdated = Date.now();
    },
  },
  actions: {
    create({ commit }, item) {
      const tab = db().get('tabs').insert(item).write();

      commit('create', tab);
      return tab;
    },
  },
};
