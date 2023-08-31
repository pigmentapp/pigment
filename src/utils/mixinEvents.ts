import { Tab } from '@/types';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import Vue from 'vue';
import { RawLocation } from 'vue-router';

export default Vue.extend({
  computed: {
    tabListSorted(): Tab[] {
      return (this.$store.getters['Tabs/listSorted'] as Tab[]).filter((tab) => !tab.isSecondary);
    },
  },
  watch: {
    windowHasFocus(hasFocus: boolean) {
      if (hasFocus) {
        ipc.send('app-hide-app-icon-badge');
      }
    },
  },
  created() {
    const r = this.$router;

    ipc.answerMain('app-router-goto-tabs-create', () => r.push({ name: 'tabs-create' }));
    ipc.answerMain('app-router-goto-tab-list-index', (index: number) => this.goToTabWithListIndex(index));

    ipc.answerMain('app-router-push', (routeProps: RawLocation) => {
      r.push(routeProps);
    });

    ipc.answerMain('app-settings-toggle', (settingsIdentifier) => {
      this.$store.dispatch('Settings/toggle', settingsIdentifier);
    });

    ipc.answerMain('app-has-focus', (hasFocus) => {
      if (hasFocus) ipc.callMain('app-bv-focus-active');
    });
  },
  methods: {
    goToTabWithListIndex(index: number) {
      const tab = this.tabListSorted[index - 1];

      if (tab) {
        this.$router.push({
          name: 'tabs',
          params: { id: tab.id },
        });
      }
    },
  },
});
