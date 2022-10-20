<template>
  <div
    :class="{
      [$style.dimmer]: true,
      [$style.active]: isActive,
    }"
  >
    <div :class="$style.screen">
      <div :class="$style.content">
        <div
          :class="{
            [$style.icon]: true,
            [$style.iconHighlight]: hasNewNotifications,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TabNotification, Settings, Tab } from '@/types';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      timeout: setTimeout(() => { /* */ }),
      isActive: false,
    };
  },
  computed: {
    activeTab(): Tab {
      return this.$store.getters['Tabs/active'];
    },
    displayNotificationBadge(): Settings['dimmer.displayBadgeAtNewNotifications'] {
      return this.$store.getters['Settings/byKey']('dimmer.displayBadgeAtNewNotifications');
    },
    hasNewNotifications(): boolean {
      return !this.windowHasFocus
        && this.displayNotificationBadge
        && !!this.notificationsAfterWindowBlur.length;
    },
    notificationsAfterWindowBlur(): TabNotification[] {
      return this.$store.getters['Notifications/list']({
        newerThanTimestamp: this.windowTimestampOfBlur,
      });
    },
    settingsIsDimActive(): Settings['dimmer.dimIfWindowIsNotInFocus'] | undefined {
      const key = 'dimmer.dimIfWindowIsNotInFocus';
      if (this.activeTabHasSetting(key)) {
        return this.activeTab.settings[key];
      }
      return this.$store.getters['Settings/byKey'](key);
    },
    settingsDimDelay(): Settings['dimmer.dimDelayInMs'] {
      return this.$store.getters['Settings/byKey']('dimmer.dimDelayInMs');
    },
    windowHasFocus(): boolean {
      return this.$store.getters['Window/hasFocus'];
    },
    windowTimestampOfBlur(): number {
      return this.$store.getters['Window/timestampOfBlur'];
    },
  },
  watch: {
    windowHasFocus(value) {
      clearTimeout(this.timeout);

      if (!value && this.settingsIsDimActive) {
        this.timeout = setTimeout(() => {
          this.isActive = true;
        }, this.settingsDimDelay);
      } else {
        this.isActive = false;
      }
    },
    settingsIsDimActive(value) {
      if (!value) {
        clearTimeout(this.timeout);
        this.isActive = false;
      }
    },
  },
  created() {
    ipc.answerMain('app-has-focus', (hasFocus) => {
      if (hasFocus) this.onFocus();
      else this.onBlur();
    });

    window.addEventListener('beforeunload', () => {
      clearTimeout(this.timeout);
    });
  },
  methods: {
    onBlur() {
      this.$store.dispatch('Window/hasFocus', false);
    },
    onFocus() {
      this.$store.dispatch('Window/hasFocus', true);
    },
    activeTabHasSetting(key: keyof Tab['settings']) {
      return Object.prototype.hasOwnProperty.call(this.activeTab.settings, key)
        && typeof this.activeTab.settings[key] !== 'undefined';
    },
  },
});
</script>

<style lang="postcss" module>
.dimmer {
  position: fixed;
  top: -400vh;
  right: 0;
  left: 0;
  height: 400vh;
  z-index: 40;
  background-image: linear-gradient(
    theme('colors.gray.900'),
    theme('colors.gray.900') 25%,
    transparent 100%
  );
}

.dimmer.active {
  top: 0;
  transition-duration: 280ms;
  transition-property: top;
  transition-timing-function: ease-out;
}

.screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.content {
  @apply w-64;
}

.icon {
  @apply relative w-64 h-64 mx-auto border-2 border-transparent rounded-full;
  background-image: url('../assets/logo/logo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: theme('width.48');
  opacity: 0;
  transform: rotate(45deg);
}

.active .icon {
  @apply opacity-50;
  transition-delay: 320ms;
  transition-duration: 500ms;
  transition-property: opacity, border-color, box-shadow, transform;
  transition-timing-function: ease-out;
  transform: rotate(0);
}

.iconHighlight {
  @apply border-gray-800;
  box-shadow: 0 0 theme('width.12') theme('colors.gray.800');
}
</style>
