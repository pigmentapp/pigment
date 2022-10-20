<template>
  <div :class="$style.wrap">
    <tabs-nav :show-secondary-tabs="showSecondaryTabs" />
    <div :class="$style.buttons">
      <side-bar-button
        v-if="tabListSecondary.length"
        :show-label="displaysTabLabels"
        :icon="showSecondaryTabs ? 'UnfoldLessHorizontal' : 'UnfoldMoreHorizontal'"
        title="Toggle secondary tabs"
        @click="showSecondaryTabs = !showSecondaryTabs"
      >
        Secondary tabs
      </side-bar-button>
      <div :class="$style.buttonsBottom">
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
  </div>
</template>

<script lang="ts">
import { ipcRenderer as ipc } from 'electron-better-ipc';
import Vue from 'vue';
import SideBarButton from '@/components/SideBarButton.vue';
import TabsNav from '@/components/TabsNav.vue';
import { Settings, Tab } from '@/types';

export default Vue.extend({
  components: {
    SideBarButton,
    TabsNav,
  },
  data() {
    return {
      showMenuBadge: false,
      showSecondaryTabs: false,
    };
  },
  computed: {
    displaysTabLabels(): Settings['navigation.displayTabLabels'] {
      const key = 'navigation.displayTabLabels';
      return this.$store.getters['Settings/byKey'](key);
    },
    tabListSecondary(): Tab[] {
      return this.$store.getters['Tabs/listSorted'].filter((tab: Tab) => tab.isSecondary);
    },
  },
  created() {
    ipc.answerMain('app-update-available', (info) => {
      if (this.$route.name !== 'home') {
        this.showMenuBadge = true;
      }
      this.$store.commit('SET_UPDATE_INFO', info);
    });
  },
  methods: {
    showMenu() {
      ipc.callMain('app-show-settings-menu', {
        checked: [
          this.$store.getters['Settings/byKey']('navigation.displayTabLabels') && 'navigation.displayTabLabels',
          this.$store.getters['Settings/byKey']('dimmer.dimIfWindowIsNotInFocus') && 'dimmer.dimIfWindowIsNotInFocus',
          this.$store.getters['Settings/byKey']('window.muteAudioIfWindowIsNotInFocus') && 'window.muteAudioIfWindowIsNotInFocus',
          this.$store.getters['Settings/byKey']('notifications.holdBackIfWindowIsNotInFocus') && 'notifications.holdBackIfWindowIsNotInFocus',
        ],
      });
    },
  },
});
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

.buttonsBottom {
  @apply mt-auto;
}

@media (hover: hover) {
  .wrap:not(:hover) .buttons {
    @apply text-gray-800 border-opacity-25;
  }
}
</style>
