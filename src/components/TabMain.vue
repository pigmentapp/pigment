<template>
  <div
    v-show="isActive"
    class="flex flex-grow"
  >
    <webview
      v-show="item.url && !isSettingsView"
      ref="view"
      :src="item.url"
      :useragent="item.userAgent"
    />

    <tab-settings
      v-show="isSettingsView || !item.url"
      :item="item"
      @submitted="settingsChanged"
    />
  </div>
</template>

<script>
import url from 'url';
import { TabEvents } from '@/events';
import TabSettings from '@/components/TabSettings.vue';

export default {
  components: {
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
    };
  },
  computed: {
    activeTab() {
      return this.$store.getters['Tabs/active'];
    },
    isActive() {
      return this.item.ident === this.activeTab.ident;
    },
  },
  mounted() {
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

    TabEvents.$on('reloadByIdent', (ident) => {
      if (this.item.ident === ident) {
        this.reloadTab();
      }
    });

    TabEvents.$on('settingsByIdent', (ident) => {
      if (this.item.ident === ident) {
        this.isSettingsView = !this.isSettingsView;
      }
    });

    TabEvents.$on('goHomeByIdent', (ident) => {
      if (this.item.ident === ident) {
        this.$refs.view.src = this.item.url;
      }
    });

    TabEvents.$on('devtoolsByIdent', (ident) => {
      if (this.item.ident !== ident) return;
      if (this.$refs.view.isDevToolsOpened()) {
        this.$refs.view.closeDevTools();
      } else {
        this.$refs.view.openDevTools();
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
    reloadTab() {
      this.$refs.view.reload();
    },
  },
};
</script>

<style lang="postcss" scoped>
webview {
  @apply absolute pin;
}
</style>
