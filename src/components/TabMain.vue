<template>
  <div
    v-show="isActive"
    :class="$style.wrap"
  >
    <tab-header
      v-if="isActive"
      :item="item"
      @doReload="reloadTab"
      @goToHome="goToHome"
      @toggleDevTools="toggleDevTools"
    />

    <webview
      ref="view"
      :src="item.url"
      :useragent="userAgent"
      :preload="preload"
      :class="$style.viewport"
    />
  </div>
</template>

<script>
import path from 'path';
import url from 'url';
import TabHeader from '@/components/TabHeader.vue';

export default {
  components: {
    TabHeader,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      preload: `file://${path.join(__static, 'webview.js')}`, // eslint-disable-line no-undef
    };
  },
  computed: {
    isActive() {
      return parseInt(this.$route.params.ident, 0) === this.item.ident;
    },
    muteOnWindowBlur() {
      return this.$store.getters['Settings/muteOnWindowBlur'];
    },
    notificationsPreventOnBlur() {
      return this.$store.getters['Notifications/preventOnBlur'];
    },
    userAgent() {
      return this.item.userAgent || navigator.userAgent;
    },
    windowHasFocus() {
      return this.$store.getters['Window/hasFocus'];
    },
  },
  watch: {
    isActive(isActive) {
      if (isActive) {
        this.$store.commit('Tabs/activateIdent', this.item.ident);
        this.$refs.view.focus();
      }
    },
    windowHasFocus(value) {
      if (!this.muteOnWindowBlur) return;
      this.$refs.view.setAudioMuted(!value);
    },
  },
  mounted() {
    this.$refs.view.addEventListener('ipc-message', (event) => {
      if (event.channel !== 'notification') return;

      const [notification] = event.args;

      this.$store.commit('Notifications/add', {
        notification,
        tabIdent: this.item.ident,
      });

      if (!this.notificationsPreventOnBlur || this.windowHasFocus) {
        new Notification(notification.title, notification.options); // eslint-disable-line no-new
      }
    });

    this.$refs.view.addEventListener('page-title-updated', ({ title }) => {
      this.$store.commit('Pages/setState', {
        tabId: this.item.ident,
        data: { title },
      });
    });

    this.$refs.view.addEventListener('page-favicon-updated', ({ favicons }) => {
      const [favicon] = favicons;

      this.$store.commit('Pages/setState', {
        tabId: this.item.ident,
        data: { favicon },
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
    goToHome() {
      this.$refs.view.loadURL(this.item.url);
    },
    reloadTab() {
      this.$refs.view.reload();
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

<style lang="postcss" module>
.wrap {
  @apply flex flex-1 flex-col;
}

.viewport {
  @apply flex-grow;
}
</style>
