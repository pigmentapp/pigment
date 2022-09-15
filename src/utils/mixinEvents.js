import { ipcRenderer as ipc } from 'electron-better-ipc';

export default {
  computed: {
    tabListSorted() {
      return this.$store.getters['Tabs/listSorted'].filter((tab) => !tab.isSecondary);
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
    const r = this.$router;

    ipc.answerMain('app-router-goto-tabs-create', () => r.push({ name: 'tabs-create' }));
    ipc.answerMain('app-router-goto-tab-list-index', (index) => this.goToTabWithListIndex(index));

    ipc.answerMain('app-router-push', (routeProps) => {
      r.push(routeProps);
    });

    ipc.answerMain('app-settings-toggle', (settingsIdentifier) => {
      this.$store.dispatch('Settings/toggle', settingsIdentifier);
    });
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
