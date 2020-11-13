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
        :show-badge="showMenuBadge"
        :show-label="displaysTabLabels"
        icon="Menu"
        title="Show menu"
        @click.native="showMenuBadge = false"
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

export default {
  components: {
    SideBarButton,
    TabsNav,
  },
  data() {
    return {
      showMenuBadge: false,
    };
  },
  computed: {
    displaysTabLabels() {
      const key = 'navigation.displayTabLabels';
      return this.$store.getters['Settings/byKey'](key);
    },
  },
  created() {
    remote.app.on('app-update-available', (info) => {
      if (this.$route.name !== 'home') {
        this.showMenuBadge = true;
      }
      this.$store.commit('SET_UPDATE_INFO', info);
    });
  },
  methods: {
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
          click: () => remote.app.emit('app-update-check'),
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
