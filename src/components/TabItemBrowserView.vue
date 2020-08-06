<script>
import { remote } from 'electron';
import path from 'path';
import url from 'url';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      canGoBack: false,
      canGoForward: false,
      dimTimeout: 0,
      isActive: false,
      isLoaded: false,
      isLoadedCooldown: 0,
      view: {},
    };
  },
  computed: {
    dimDelay() {
      return this.$store.getters['Settings/byKey']('dimmer.dimDelayInMs');
    },
    dimOnWindowBlur() {
      const key = 'dimmer.dimIfWindowIsNotInFocus';
      if (this.hasTabSetting(key)) {
        return this.item.settings[key];
      }
      return this.$store.getters['Settings/byKey'](key);
    },
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
    userAgent() {
      return this.item.userAgent || navigator.userAgent;
    },
    webContents() {
      return this.view.webContents;
    },
    windowHasFocus() {
      return this.$store.getters['Window/hasFocus'];
    },
    viewSize() {
      return this.$store.getters['Window/mainBoundingClientRect'];
    },
  },
  watch: {
    $route: 'checkActiveState',
    viewSize: 'resizeView',
    windowHasFocus(value) {
      const {
        dimDelay,
        dimOnWindowBlur,
        isActive,
        muteOnWindowBlur,
        webContents,
      } = this;

      if (muteOnWindowBlur) {
        webContents.setAudioMuted(!value);
      }

      if (dimOnWindowBlur && isActive) {
        if (value) {
          clearTimeout(this.dimTimeout);
          this.toggleView(true);
        } else {
          this.dimTimeout = setTimeout(
            () => this.toggleView(false),
            dimDelay,
          );
        }
      }
    },
  },
  created() {
    this.view = new remote.BrowserView({
      webPreferences: {
        enableRemoteModule: true,
        preload: path.join(__static, 'webview.js'),
        partition: this.item.scope
          ? `persist:${this.item.scope}`
          : undefined,
      },
    });

    this.checkActiveState();
  },
  mounted() {
    const { userAgent, webContents } = this;

    webContents.loadURL(this.item.url, { userAgent });

    webContents.on('did-start-loading', () => {
      clearTimeout(this.isLoadedCooldown);
      this.isLoaded = false;
    });

    webContents.on('did-stop-loading', () => {
      this.$store.commit('Pages/setState', {
        tabId: this.item.id,
        data: { url: webContents.getURL() },
      });

      this.isLoadedCooldown = setTimeout(() => {
        this.isLoaded = true;
      }, 2000);
    });

    webContents.on('dom-ready', () => {
      const { customCss, customJs } = this.item;
      webContents.insertCSS(customCss);
      webContents.executeJavaScript(customJs);
    });

    webContents.on('page-title-updated', (_, title) => {
      this.$store.commit('Pages/setState', {
        tabId: this.item.id,
        data: { title },
      });

      this.evaluateIfHasNotifications();
    });

    webContents.on('page-favicon-updated', (_, favicons) => {
      const favicon = favicons.pop();

      this.$store.commit('Pages/setState', {
        tabId: this.item.id,
        data: { favicon },
      });

      this.evaluateIfHasNotifications();
    });

    webContents.on('new-window', (_, openUrl) => {
      const { protocol } = url.parse(openUrl);

      if (protocol === 'http:' || protocol === 'https:') {
        remote.shell.openExternal(openUrl);
      }
    });

    webContents.on('ipc-message', (_, channel, ...args) => {
      if (channel !== 'notification') return;

      const [notification] = args;

      this.$store.commit('Notifications/add', {
        notification,
        tabId: this.item.id,
      });

      this.evaluateIfHasNotifications();

      if (!this.notificationsPreventOnBlur || this.windowHasFocus) {
        new Notification(notification.title, notification.options); // eslint-disable-line no-new
      }

      if (this.notificationsDisplayAppBadge && !this.windowHasFocus) {
        remote.app.emit('app-show-app-icon-badge');
      }
    });

    webContents.on('did-navigate', () => {
      this.canGoBack = webContents.canGoBack();
      this.canGoForward = webContents.canGoForward();
    });

    webContents.on('did-navigate-in-page', () => {
      this.canGoBack = webContents.canGoBack();
      this.canGoForward = webContents.canGoForward();
    });

    webContents.on('did-frame-navigate', () => {
      this.canGoBack = webContents.canGoBack();
      this.canGoForward = webContents.canGoForward();
    });
  },
  beforeDestroy() {
    remote.getCurrentWindow().removeBrowserView(this.view);
    this.view.destroy();
  },
  methods: {
    checkActiveState({ name, params, query } = this.$route) {
      this.isActive = params.id === this.item.id && name === 'tabs';

      if (this.isActive) {
        this.$store.commit('Tabs/setActiveTabId', params.id);

        this.$store.commit('Pages/setState', {
          tabId: params.id,
          data: { hasNotificationBadge: false },
        });

        this.toggleView(true);

        if (query.reload) {
          this.webContents.reload();
        }
      } else {
        this.toggleView(false);
      }
    },
    evaluateIfHasNotifications() {
      this.$store.commit('Pages/setState', {
        tabId: this.item.id,
        data: {
          hasNotificationBadge: this.isLoaded && !this.isActive,
        },
      });
    },
    resizeView(value = this.viewSize) {
      this.view.setBounds({
        x: Math.trunc(value.x),
        y: Math.trunc(value.y),
        width: Math.trunc(value.width),
        height: Math.trunc(value.height),
      });
    },
    toggleView(show = true) {
      if (show && this.windowHasFocus) {
        remote.getCurrentWindow().addBrowserView(this.view);
        this.resizeView();
        this.webContents.focus();
      } else {
        remote.getCurrentWindow().removeBrowserView(this.view);
      }
    },
    executeMethod([methodName, ...methodParams]) {
      this.webContents[methodName](...methodParams);
    },
    hasTabSetting(key) {
      return Object.prototype.hasOwnProperty.call(this.item.settings, key)
        && typeof this.item.settings[key] !== 'undefined';
    },
  },
  render() {
    return this.isActive && this.$scopedSlots.default({
      canGoBack: this.canGoBack,
      canGoForward: this.canGoForward,
      executeMethod: this.executeMethod,
    });
  },
};
</script>
