import { ipcRenderer as ipc } from 'electron-better-ipc';

export default {
  computed: {
    tabListSorted() {
      return this.$store.getters['Tabs/listSorted'];
    },
  },
  watch: {
    windowHasFocus(hasFocus) {
      if (hasFocus) {
        ipc.send('app-hide-app-icon-badge');
      }
    },
  },
  created() {
    const { app } = this.$electron.remote;
    const r = this.$router;

    app.on('app-router-goto-tabs-create', () => r.push({ name: 'tabs-create' }));
    app.on('app-router-goto-tab-list-index', (index) => this.goToTabWithListIndex(index));
  },
  methods: {
    goToTabWithListIndex(index) {
      const tab = this.tabListSorted[index - 1];

      if (tab) {
        this.$router.push({
          name: 'tabs',
          params: { id: tab.id },
        });
      }
    },
  },
};
