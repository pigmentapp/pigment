<template>
  <div
    id="app"
    :class="{
      'flex-row-reverse': isLayoutInverted,
    }"
  >
    <aside class="aside">
      <window-controls
        class="aside__header"
      />
      <router-view
        class="aside__body"
        name="aside"
      />
    </aside>
    <router-view class="main" />
    <window-dimmer />
  </div>
</template>

<script>
import WindowControls from '@/components/WindowControls.vue';
import WindowDimmer from '@/components/WindowDimmer.vue';
import NotificationSchedule from '@/utils/mixinNotificationSchedule';

export default {
  components: {
    WindowControls,
    WindowDimmer,
  },
  mixins: [NotificationSchedule],
  computed: {
    isLayoutInverted() {
      return this.$store.getters['Settings/isLayoutInvertedForOs'];
    },
  },
};
</script>

<style lang="postcss" scoped>
#app {
  @apply flex h-screen font-sans text-grey bg-black select-none;
}

.aside {
  @apply flex flex-col w-64;
}

.aside__header {
  @apply flex-no-shrink;
}

.aside__body {
  @apply flex-grow;
}

.main {
  @apply z-10 flex flex-1 flex-col min-w-0 bg-grey-darkest shadow-md;
}
</style>

<style>
button:focus,
button:active:focus {
  outline: none !important;
}
</style>
