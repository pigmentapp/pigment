<template>
  <div :class="$style.wrap">
    <tabs-nav />
    <div
      :class="{
        [$style.buttons]: true,
        [$style.buttons__y]: !displaysTabLabels,
        [$style.buttons__x]: displaysTabLabels,
      }"
    >
      <side-bar-button
        :to="{ name: 'tabs-create' }"
        icon="TabPlus"
        title="Create new tab"
      />
      <side-bar-button
        :to="{ name: 'notifications' }"
        icon="Bell"
        title="Notifications center"
      />
      <side-bar-button
        v-if="displaysHomeButton"
        :to="{ name: 'welcome' }"
        icon="HomeCircle"
        title="Welcome page"
      />
      <side-bar-button
        icon="Cog"
        title="Settings and more"
        @click="$electron.remote.app.emit('app-show-settings-menu')"
      />
    </div>
  </div>
</template>

<script>
import SideBarButton from '@/components/SideBarButton.vue';
import TabsNav from '@/components/TabsNav.vue';

export default {
  components: {
    SideBarButton,
    TabsNav,
  },
  computed: {
    displaysHomeButton() {
      const key = 'navigation.displayHomeButton';
      return this.$store.getters['Settings/byKey'](key);
    },
    displaysTabLabels() {
      const key = 'navigation.displayTabLabels';
      return this.$store.getters['Settings/byKey'](key);
    },
  },
};
</script>

<style lang="postcss" module>
.wrap {
  display: grid;
  grid-template-columns: min-content;
  grid-template-rows: minmax(0, 1fr) min-content;
  min-height: 0;
}

.buttons {
  @apply flex py-2;
}

.buttons__y {
  @apply flex-col;
}

.buttons__x {
  @apply flex-row-reverse justify-around;
}
</style>
