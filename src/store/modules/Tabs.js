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
    list({ dbUpdated }) {
      return db(dbUpdated)
        .get('tabs')
        .cloneDeep()
        .value();
    },
    listSorted({ dbUpdated }, { list }) {
      const sorting = db(dbUpdated).get('sorting').value();

      return list.sort((a, b) => sorting.indexOf(a.ident) - sorting.indexOf(b.ident));
    },
  },
  mutations: {
    activateIdent(state, ident) {
      state.activeIdent = ident;
      state.dbUpdated = Date.now();
    },
    add(state, { ident, label = 'New Tab', url = '' }) {
      db()
        .get('tabs')
        .push({
          ident,
          label,
          url,
          title: '',
          favicon: '',
          isNew: true,
        })
        .write();
      state.dbUpdated = Date.now();
    },
    delete(state, item) {
      db()
        .get('tabs')
        .remove(i => i.ident === item.ident)
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
        .find(i => i.ident === ident).assign({
          ...data,
          isNew: false,
        })
        .write();

      state.dbUpdated = Date.now();
    },
  },
  actions: {
    add({ commit }, payload = {}) {
      const ident = Date.now();
      commit('add', {
        ident,
        ...payload,
      });
      return ident;
    },
  },
};
