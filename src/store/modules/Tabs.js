import deepmerge from 'deepmerge';
import Connection from '@/db';

const db = new Connection({
  file: 'tabs.json',
  defaults: {
    tabs: [],
    sorting: [],
  },
});

const defaultTab = () => ({
  label: '',
  url: '',
  userAgent: '',
  customCss: '',
  customJs: '',
  settings: {},
});

export default {
  namespaced: true,
  state: {
    activeTabId: undefined,
    dbUpdated: Date.now(),
  },
  getters: {
    active({ activeTabId, dbUpdated }) {
      if (!activeTabId) return defaultTab();

      const tab = db(dbUpdated).get('tabs').getById(activeTabId).value() || {};

      return deepmerge(defaultTab(), tab);
    },
    byId({ dbUpdated }) {
      return (id) => {
        const tab = db(dbUpdated).get('tabs').getById(id).value() || {};
        return deepmerge(defaultTab(), tab);
      };
    },
    list({ dbUpdated }) {
      const list = db(dbUpdated)
        .get('tabs')
        .cloneDeep()
        .value();

      return list.map(tab => deepmerge(defaultTab(), tab));
    },
    listSorted({ dbUpdated }, { list }) {
      const sorting = db(dbUpdated).get('sorting').value();

      return [...list].sort((a, b) => sorting.indexOf(a.id) - sorting.indexOf(b.id));
    },
  },
  mutations: {
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

      state.dbUpdated = Date.now();
    },
    setActiveTabId(state, id) {
      state.activeTabId = id;
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
      const newTab = deepmerge(defaultTab(), item);
      const tab = db().get('tabs').insert(newTab).write();

      commit('create', tab);
      return tab;
    },
  },
};
