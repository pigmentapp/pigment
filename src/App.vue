<template>
  <app-layout>
    <template slot="main">
      <tabs-list />
      <router-view :key="$route.path" />
    </template>
    <template slot="overlays">
      <window-dimmer />
    </template>
  </app-layout>
</template>

<script>
import AppLayout from '@/components/AppLayout.vue';
import TabsList from '@/components/TabsList.vue';
import WindowDimmer from '@/components/WindowDimmer.vue';
import Events from '@/utils/mixinEvents';
import NotificationSchedule from '@/utils/mixinNotificationSchedule';

export default {
  components: {
    AppLayout,
    TabsList,
    WindowDimmer,
  },
  mixins: [
    Events,
    NotificationSchedule,
  ],
};
</script>

<style lang="postcss">
a {
  @apply underline;
}
</style>
