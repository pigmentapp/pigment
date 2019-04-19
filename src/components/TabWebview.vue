<template>
  <webview
    ref="webview"
    :src="item.url"
    :useragent="userAgent"
    :preload="$options.preloadScript"
    :class="$style.webview"
  />
</template>

<script>
import path from 'path';
import url from 'url';

export default {
  preloadScript: `file://${path.join(__static, 'webview.js')}`, // eslint-disable-line no-undef
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    muteOnWindowBlur() {
      return this.$store.getters['Settings/muteOnWindowBlur'];
    },
    notificationsPreventOnBlur() {
      return this.$store.getters['Notifications/preventOnBlur'];
    },
    userAgent() {
      return this.item.userAgent || undefined;
    },
    windowHasFocus() {
      return this.$store.getters['Window/hasFocus'];
    },
  },
  watch: {
    windowHasFocus(value) {
      if (!this.muteOnWindowBlur) return;
      this.$refs.webview.setAudioMuted(!value);
    },
  },
  mounted() {
    this.$refs.webview.addEventListener('ipc-message', (event) => {
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

    this.$refs.webview.addEventListener('page-title-updated', ({ title }) => {
      this.$store.commit('Pages/setState', {
        tabId: this.item.ident,
        data: { title },
      });
    });

    this.$refs.webview.addEventListener('page-favicon-updated', ({ favicons }) => {
      const [favicon] = favicons;

      this.$store.commit('Pages/setState', {
        tabId: this.item.ident,
        data: { favicon },
      });
    });

    this.$refs.webview.addEventListener('dom-ready', (view) => {
      if ('customCss' in this.item) {
        view.target.insertCSS(this.item.customCss);
      }
      if ('customJs' in this.item) {
        view.target.executeJavaScript(this.item.customJs);
      }
    });

    this.$refs.webview.addEventListener('new-window', (e) => {
      const { protocol } = url.parse(e.url);

      if (protocol === 'http:' || protocol === 'https:') {
        this.$electron.remote.shell.openExternal(e.url);
      }
    });
  },
};
</script>

<style lang="postcss" module>
.webview {
  @apply flex-grow;
}
</style>
