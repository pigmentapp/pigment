<template>
  <div :class="$style.wrap">
    <tabs-nav />
    <div :class="$style.buttons">
      <side-bar-button
        :to="{ name: 'tabs-create' }"
        :show-label="displaysTabLabels"
        icon="TabPlus"
        title="Create tab"
      >
        Create tab
      </side-bar-button>
      <side-bar-button
        :to="{ name: 'home' }"
        :show-label="displaysTabLabels"
        icon="Menu"
        title="Show menu"
        @contextmenu.native.prevent="showMenu"
      >
        Menu
      </side-bar-button>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron';
import SideBarButton from '@/components/SideBarButton.vue';
import TabsNav from '@/components/TabsNav.vue';

const { autoUpdater } = remote.require('electron-updater');

export default {
  components: {
    SideBarButton,
    TabsNav,
  },
  data() {
    return {
      updateInterval: 0,
    };
  },
  computed: {
    displaysTabLabels() {
      const key = 'navigation.displayTabLabels';
      return this.$store.getters['Settings/byKey'](key);
    },
  },
  created() {
    if (process.env.NODE_ENV === 'production') {
      this.updateInterval = setInterval(() => {
        this.checkForUpdates();
      }, 1000 * 60 * 5);
    }
  },
  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
  methods: {
    checkForUpdates() {
      autoUpdater.checkForUpdatesAndNotify();
    },
    showMenu() {
      const settingsMenu = remote.Menu.buildFromTemplate([
        {
          label: 'Show navigation labels',
          type: 'checkbox',
          checked: this.$store.getters['Settings/byKey']('navigation.displayTabLabels'),
          click: () => this.$store.dispatch('Settings/toggle', 'navigation.displayTabLabels'),
        },
        {
          label: `Dim contents when ${this.$productInfo.productName} is out of focus`,
          type: 'checkbox',
          checked: this.$store.getters['Settings/byKey']('dimmer.dimIfWindowIsNotInFocus'),
          click: () => this.$store.dispatch('Settings/toggle', 'dimmer.dimIfWindowIsNotInFocus'),
        },
        {
          label: `Mute audio when ${this.$productInfo.productName} is out of focus`,
          type: 'checkbox',
          checked: this.$store.getters['Settings/byKey']('window.muteAudioIfWindowIsNotInFocus'),
          click: () => this.$store.dispatch('Settings/toggle', 'window.muteAudioIfWindowIsNotInFocus'),
        },
        {
          label: `Hold back notifications when ${this.$productInfo.productName} is out of focus`,
          type: 'checkbox',
          checked: this.$store.getters['Settings/byKey']('notifications.holdBackIfWindowIsNotInFocus'),
          click: () => this.$store.dispatch('Settings/toggle', 'notifications.holdBackIfWindowIsNotInFocus'),
        },
        { type: 'separator' },
        {
          label: 'More settings…',
          click: () => this.$router.push({ name: 'settings' }),
        },
        { type: 'separator' },
        {
          label: 'Check for updates…',
          click: () => this.checkForUpdates(),
        },
        { role: 'toggledevtools' },
      ]);

      settingsMenu.popup();
    },
  },
};
</script>

<style lang="postcss" module>
.wrap {
  display: grid;
  grid-template-columns: min-content;
  grid-template-rows: auto 1fr;
  min-height: 0;
}

.buttons {
  @apply flex flex-col justify-between pt-1 pb-2
    text-gray-600 border-t border-gray-800 border-opacity-50;
}

@media (hover: hover) {
  .wrap:not(:hover) .buttons {
    @apply text-gray-800 border-opacity-25;
  }
}
</style>
