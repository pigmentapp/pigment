<template>
  <div
    v-show="isActive"
    class="flex flex-1 flex-col"
  >
    <tab-header
      v-if="isActive && !item.isNew"
      :item="item"
      @doReload="reloadTab"
      @goToHome="goToHome"
      @toggleSettings="toggleSettings"
      @toggleDevTools="toggleDevTools"
    />

    <webview
      v-show="item.url && !isSettingsView"
      ref="view"
      :src="item.url"
      :useragent="item.userAgent"
      :preload="preload"
      class="flex-grow"
    />

    <tab-settings
      v-show="isSettingsView || !item.url"
      :item="item"
      @submitted="settingsChanged"
    />
  </div>
</template>

<script>
import path from 'path';
import url from 'url';
import TabHeader from '@/components/TabHeader.vue';
import TabSettings from '@/components/TabSettings.vue';

export default {
  components: {
    TabHeader,
    TabSettings,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isSettingsView: false,
      preload: `file://${path.join(__static, 'webview.js')}`, // eslint-disable-line no-undef
    };
  },
  computed: {
    activeTab() {
      return this.$store.getters['Tabs/active'];
    },
    isActive() {
      if (this.$route.name === 'settings' && this.activeTab.ident === this.item.ident) return true;
      return parseInt(this.$route.params.ident, 0) === this.item.ident;
    },
    muteOnWindowBlur() {
      return this.$store.getters['Settings/muteOnWindowBlur'];
    },
    windowHasFocus() {
      return this.$store.getters['Window/hasFocus'];
    },
  },
  watch: {
    isActive(isActive) {
      if (isActive) {
        this.$store.commit('Tabs/activateIdent', this.item.ident);
      }
    },
    windowHasFocus(value) {
      if (!this.muteOnWindowBlur) return;
      this.$refs.view.setAudioMuted(!value);
    },
  },
  mounted() {
    this.$refs.view.addEventListener('ipc-message', (event) => {
      if (event.channel === 'notification') {
        const [notification] = event.args;

        this.$store.commit('Notifications/add', {
          notification,
          tab: this.item.ident,
        });
      }
    });

    this.$refs.view.addEventListener('page-title-updated', (view) => {
      this.$store.commit('Tabs/update', {
        ident: this.item.ident,
        data: {
          title: view.title,
        },
      });
    });

    this.$refs.view.addEventListener('page-favicon-updated', (view) => {
      const favicon = view.favicons[0];

      this.$store.commit('Tabs/update', {
        ident: this.item.ident,
        data: {
          favicon,
        },
      });
    });

    this.$refs.view.addEventListener('dom-ready', (view) => {
      if ('customCss' in this.item) {
        view.target.insertCSS(this.item.customCss);
      }
      if ('customJs' in this.item) {
        view.target.executeJavaScript(this.item.customJs);
      }
    });

    this.$refs.view.addEventListener('new-window', (e) => {
      const { protocol } = url.parse(e.url);

      if (protocol === 'http:' || protocol === 'https:') {
        this.$electron.remote.shell.openExternal(e.url);
      }
    });
  },
  methods: {
    settingsChanged(options) {
      this.isSettingsView = false;

      if (!options.isNewTab) {
        this.reloadTab();
      }
    },
    goToHome() {
      this.$refs.view.loadURL(this.item.url);
    },
    reloadTab() {
      this.$refs.view.reload();
    },
    toggleSettings() {
      this.isSettingsView = !this.isSettingsView;
    },
    toggleDevTools() {
      if (this.$refs.view.isDevToolsOpened()) {
        this.$refs.view.closeDevTools();
      } else {
        this.$refs.view.openDevTools();
      }
    },
  },
};
</script>
