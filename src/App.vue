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
    <window-dim
      el="router-view"
      class="main"
    />
  </div>
</template>

<script>
import WindowControls from '@/components/WindowControls.vue';
import WindowDim from '@/components/WindowDim.vue';
import NotificationSchedule from '@/utils/mixinNotificationSchedule';

export default {
  components: {
    WindowControls,
    WindowDim,
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
