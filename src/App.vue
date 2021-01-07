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
import { ipcRenderer as ipc } from 'electron-better-ipc';
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
    ipc.callMain('app-bv-destroy-all');
  },
};
</script>

<style lang="postcss">
a {
  @apply underline;
}
</style>
