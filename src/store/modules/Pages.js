export default {
  namespaced: true,
  state: {
    pages: [],
  },
  getters: {
    state({ pages }) {
      return tabId => pages.find(page => page.tabId === tabId) || {};
    },
  },
  mutations: {
    setState({ pages }, { tabId, data = {} }) {
      const pageIndex = pages.findIndex(page => page.tabId === tabId);
      const pageState = pages[pageIndex] || {};

      const newState = {
        title: '',
        hasNotificationBadge: false,
        ...pageState,
        ...data,
      };

      if (pageIndex !== -1) {
        this._vm.$set(pages, pageIndex, newState);
      } else {
        pages.push({ tabId, ...newState });
      }
    },
  },
};
