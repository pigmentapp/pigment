<template>
  <webview
    ref="webview"
    :src="item.url"
    :useragent="userAgent"
    :partition="scope"
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
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      canGoBack: false,
      canGoForward: false,
      isLoaded: false,
    };
  },
  computed: {
    muteOnWindowBlur() {
      const key = 'window.muteAudioIfWindowIsNotInFocus';
      if (this.hasTabSetting(key)) {
        return this.item.settings[key];
      }
      return this.$store.getters['Settings/byKey'](key);
    },
    notificationsPreventOnBlur() {
      const key = 'notifications.holdBackIfWindowIsNotInFocus';
      if (this.hasTabSetting(key)) {
        return this.item.settings[key];
      }
      return this.$store.getters['Settings/byKey'](key);
    },
    notificationsDisplayAppBadge() {
      const key = 'notifications.displayAppIconBadgeIfWindowIsNotInFocus';
      return this.$store.getters['Settings/byKey'](key);
    },
    scope() {
      return !!this.item.scope && `persist:${this.item.scope}`;
    },
    userAgent() {
      return this.item.userAgent || navigator.userAgent;
    },
    windowHasFocus() {
      return this.$store.getters['Window/hasFocus'];
    },
    webview() {
      return this.$refs.webview;
    },
  },
  watch: {
    windowHasFocus(value) {
      if (!this.muteOnWindowBlur) return;
      this.webview.audioMuted = !value;
    },
  },
  mounted() {
    this.webview.addEventListener('load-commit', () => {
      this.canGoBack = this.webview.canGoBack();
      this.canGoForward = this.webview.canGoForward();
    });

    this.webview.addEventListener('did-stop-loading', () => {
      this.isLoaded = true;

      this.$store.commit('Pages/setState', {
        tabId: this.item.id,
        data: { url: this.webview.getURL() },
      });
    });

    this.webview.addEventListener('did-start-loading', () => {
      this.isLoaded = false;
    });

    this.webview.addEventListener('ipc-message', (event) => {
      if (event.channel !== 'notification') return;

      const [notification] = event.args;

      this.$store.commit('Notifications/add', {
        notification,
        tabId: this.item.id,
      });

      this.evaluateIfHasNotifications();

      if (!this.notificationsPreventOnBlur || this.windowHasFocus) {
        new Notification(notification.title, notification.options); // eslint-disable-line no-new
      }

      if (this.notificationsDisplayAppBadge && !this.windowHasFocus) {
        this.$electron.remote.app.emit('app-show-app-icon-badge');
      }
    });

    this.webview.addEventListener('page-title-updated', ({ title }) => {
      this.$store.commit('Pages/setState', {
        tabId: this.item.id,
        data: { title },
      });

      this.evaluateIfHasNotifications();
    });

    this.webview.addEventListener('page-favicon-updated', ({ favicons }) => {
      const favicon = favicons.pop();

      this.$store.commit('Pages/setState', {
        tabId: this.item.id,
        data: { favicon },
      });

      this.evaluateIfHasNotifications();
    });

    this.webview.addEventListener('dom-ready', (view) => {
      // Remove this once https://github.com/electron/electron/issues/14474 is fixed
      this.webview.blur();
      this.webview.focus();

      if ('customCss' in this.item) {
        view.target.insertCSS(this.item.customCss);
      }
      if ('customJs' in this.item) {
        view.target.executeJavaScript(this.item.customJs);
      }
    });

    this.webview.addEventListener('new-window', (e) => {
      const { protocol } = url.parse(e.url);

      if (protocol === 'http:' || protocol === 'https:') {
        this.$electron.remote.shell.openExternal(e.url);
      }
    });
  },
  methods: {
    evaluateIfHasNotifications() {
      this.$store.commit('Pages/setState', {
        tabId: this.item.id,
        data: {
          hasNotificationBadge: this.isLoaded && !this.isActive,
        },
      });
    },
    hasTabSetting(key) {
      return Object.prototype.hasOwnProperty.call(this.item.settings, key)
        && typeof this.item.settings[key] !== 'undefined';
    },
  },
};
</script>

<style lang="postcss" module>
.webview {
  @apply flex-grow;
}
</style>
