<script lang="ts">
import { ipcMain, ipcRenderer } from 'electron';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import Vue from 'vue';
import { Route } from 'vue-router';
import {
  ExecuteWebContentsMethod,
  IpcBrowserViewUpdateState,
  Settings,
  Tab,
  TabSettings,
  WebContentsMethods,
} from '@/types';

// fix for electron-better-ipc
// from https://github.com/sindresorhus/electron-better-ipc/issues/35
if (ipcMain !== undefined) {
  ipcMain.addListener('fix-event-798e09ad-0ec6-5877-a214-d552934468ff', () => { /* */ });
}

if (ipcRenderer !== undefined) {
  ipcRenderer.addListener('fix-event-79558e00-29ef-5c7f-84bd-0bcd9a0c5cf3', () => { /* */ });
}
// end fix

export default Vue.extend({
  props: {
    item: {
      type: Object as () => Tab,
      required: true,
    },
  },
  data() {
    return {
      dimTimeout: setTimeout(() => { /* */ }),
      isActive: false,
      isInizialized: false,
      isLoaded: false,
      viewId: '',
    };
  },
  computed: {
    dimDelay(): Settings['dimmer.dimDelayInMs'] {
      return this.$store.getters['Settings/byKey']('dimmer.dimDelayInMs');
    },
    dimOnWindowBlur(): Settings['dimmer.dimIfWindowIsNotInFocus'] {
      const key = 'dimmer.dimIfWindowIsNotInFocus';
      if (this.hasTabSetting(key)) {
        return !!this.item.settings[key];
      }
      return this.$store.getters['Settings/byKey'](key);
    },
    muteOnWindowBlur(): Settings['window.muteAudioIfWindowIsNotInFocus'] {
      const key = 'window.muteAudioIfWindowIsNotInFocus';
      if (this.hasTabSetting(key)) {
        return !!this.item.settings[key];
      }
      return this.$store.getters['Settings/byKey'](key);
    },
    notificationsPreventOnBlur(): Settings['notifications.holdBackIfWindowIsNotInFocus'] {
      const key = 'notifications.holdBackIfWindowIsNotInFocus';
      if (this.hasTabSetting(key)) {
        return !!this.item.settings[key];
      }
      return this.$store.getters['Settings/byKey'](key);
    },
    notificationsDisplayAppBadge(): Settings['notifications.displayAppIconBadgeIfWindowIsNotInFocus'] {
      const key = 'notifications.displayAppIconBadgeIfWindowIsNotInFocus';
      return this.$store.getters['Settings/byKey'](key);
    },
    userAgent(): Tab['userAgent'] {
      return this.item.userAgent || navigator.userAgent;
    },
    windowHasFocus(): boolean {
      return this.$store.getters['Window/hasFocus'];
    },
  },
  watch: {
    $route: 'checkActiveState',
    windowHasFocus(value: boolean) {
      const {
        dimDelay,
        dimOnWindowBlur,
        isActive,
        muteOnWindowBlur,
      } = this;

      if (muteOnWindowBlur) {
        this.executeMethod({ methodName: 'setAudioMuted', methodParams: [!value] });
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
    const { id: tabId } = this.item;

    ipc.answerMain<IpcBrowserViewUpdateState>('app-bv-update-state', ({ viewId, data }) => {
      if (viewId !== this.viewId) return;

      this.isLoaded = !!data.isLoaded;

      this.$store.commit('Pages/setState', { tabId, data });

      if (data.favicon) {
        this.$store.commit('Tabs/update', {
          id: tabId,
          data: {
            favicon: data.favicon,
          },
        });
      }

      const dataKeys = Object.keys(data);
      if (['favicon', 'title'].some((needle) => dataKeys.includes(needle))) {
        this.evaluateIfHasNotifications();
      }
    });

    ipc.answerMain('app-bv-new-notification', ({ viewId, data }: any) => {
      if (viewId !== this.viewId) return;
      const { notification } = data;

      this.$store.commit('Notifications/add', {
        notification,
        tabId: this.item.id,
      });

      this.evaluateIfHasNotifications();

      if (!this.notificationsPreventOnBlur || this.windowHasFocus) {
        new Notification(notification.title, notification.options); // eslint-disable-line no-new
      }

      if (this.notificationsDisplayAppBadge && !this.windowHasFocus) {
        ipc.send('app-show-app-icon-badge');
      }
    });
  },
  mounted() {
    (async () => {
      const { userAgent } = this;
      const { url } = this.item;
      await this.createView();
      await this.setCustomScripts();
      this.executeMethod({ methodName: 'setUserAgent', methodParams: [userAgent] });

      if (!this.item.isLazy) {
        this.executeMethod({ methodName: 'loadURL', methodParams: [url] });
        this.isInizialized = true;
      }

      this.checkActiveState(this.$route);
    })();
  },
  beforeDestroy() {
    ipc.callMain('app-bv-destroy-by-id', this.viewId);
  },
  methods: {
    async createView() {
      const { scope: partition } = this.item;
      this.viewId = await ipc.callMain('app-bv-create', { partition });
    },
    async checkActiveState({ name, params, query }: Route) {
      this.isActive = params.id === this.item.id && name === 'tabs';

      if (this.isActive) {
        this.$store.commit('Tabs/setActiveTabId', params.id);

        this.$store.commit('Pages/setState', {
          tabId: params.id,
          data: { hasNotificationBadge: false },
        });

        this.toggleView(true);

        if (query.reload) {
          const { userAgent } = this;
          await this.setCustomScripts();
          this.executeMethod({ methodName: 'setUserAgent', methodParams: [userAgent] });
          this.executeMethod({ methodName: 'reload', methodParams: [] });
        } else if (this.item.isLazy && !this.isInizialized) {
          this.executeMethod({ methodName: 'loadURL', methodParams: [this.item.url] });
          this.isInizialized = true;
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
    toggleView(show = true) {
      if (show && (this.windowHasFocus || !this.dimOnWindowBlur)) {
        ipc.callMain('app-bv-show-by-id', this.viewId);
      } else {
        ipc.callMain('app-bv-hide-by-id', this.viewId);
      }
    },
    executeMethod<K extends WebContentsMethods>(
      { methodName, methodParams }: Omit<ExecuteWebContentsMethod<K>, 'viewId'>,
    ) {
      ipc.callMain<ExecuteWebContentsMethod<K>>('app-bv-execute-webcontents-method', {
        viewId: this.viewId,
        methodName,
        methodParams,
      });
    },
    async setCustomScripts() {
      const { viewId } = this;
      const { customCss: css, customJs: js } = this.item;
      await ipc.callMain('app-bv-set-custom-scripts', { viewId, css, js });
    },
    hasTabSetting(key: keyof TabSettings) {
      return Object.prototype.hasOwnProperty.call(this.item.settings, key)
        && typeof this.item.settings[key] !== 'undefined';
    },
  },
  render() {
    return (this as any).isActive && this.$scopedSlots.default?.({
      executeMethod: (this as any).executeMethod,
    });
  },
});
</script>
