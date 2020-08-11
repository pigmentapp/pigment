<template>
  <app-layout>
    <template slot="main">
      <router-view
        :key="`aside_${$route.path}`"
        name="aside"
      />
      <router-view
        :key="`main_${$route.path}`"
      />
    </template>
    <template slot="overlays">
      <window-dimmer />
    </template>

    <tab-item
      v-for="tab in $store.getters['Tabs/list']"
      :key="tab.id"
      :item="tab"
    />
  </app-layout>
</template>

<script>
import { remote } from 'electron';
import AppLayout from '@/components/AppLayout.vue';
import TabItem from '@/components/TabItem.vue';
import WindowDimmer from '@/components/WindowDimmer.vue';
import Events from '@/utils/mixinEvents';
import NotificationSchedule from '@/utils/mixinNotificationSchedule';

export default {
  components: {
    AppLayout,
    TabItem,
    WindowDimmer,
  },
  mixins: [
    Events,
    NotificationSchedule,
  ],
  created() {
    this.destroyBrowserViews();
  },
  methods: {
    destroyBrowserViews() {
      const browserViews = remote.getCurrentWindow().getBrowserViews();
      browserViews.forEach((view) => {
        remote.getCurrentWindow().removeBrowserView(view);
        view.destroy();
      });
    },
  },
};
</script>

<style lang="postcss">
a {
  @apply underline;
}
</style>
