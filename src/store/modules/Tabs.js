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
    activeIdent: 0,
    dbUpdated: Date.now(),
  },
  getters: {
    active({ activeIdent, dbUpdated }) {
      return db(dbUpdated).get('tabs').find(item => item.ident === activeIdent).value() || {};
    },
    byIdent({ dbUpdated }) {
      return ident => db(dbUpdated).get('tabs').find(item => item.ident === ident).value() || {};
    },
    list({ dbUpdated }) {
      return db(dbUpdated)
        .get('tabs')
        .cloneDeep()
        .value();
    },
    listSorted({ dbUpdated }, { list }) {
      const sorting = db(dbUpdated).get('sorting').value();

      return [...list].sort((a, b) => sorting.indexOf(a.ident) - sorting.indexOf(b.ident));
    },
  },
  mutations: {
    activateIdent(state, ident) {
      state.activeIdent = ident;
      state.dbUpdated = Date.now();
    },
    create(state, item) {
      db()
        .get('tabs')
        .push({
          ...item,
          title: '',
          favicon: '',
        })
        .write();

      db()
        .get('sorting')
        .push(item.ident)
        .write();

      state.dbUpdated = Date.now();
    },
    delete(state, item) {
      db()
        .get('tabs')
        .remove(i => i.ident === item.ident)
        .write();

      db()
        .get('sorting')
        .remove(i => i === item.ident)
        .write();

      state.activateIdent = 0;
      state.dbUpdated = Date.now();
    },
    setSorting(state, items) {
      db().set('sorting', items.map(item => item.ident)).write();
      state.dbUpdated = Date.now();
    },
    update(state, { ident, data }) {
      db()
        .get('tabs')
        .find(i => i.ident === ident).assign(data)
        .write();

      state.dbUpdated = Date.now();
    },
  },
  actions: {
    create({ commit }, payload = {}) {
      const ident = Date.now();
      const item = {
        ident,
        ...payload,
      };
      commit('create', item);
      return item;
    },
  },
};
