<template>
  <div
    :class="{
      [$style.app]: true,
      [$style['app--sidebar-right']]: isLayoutInverted,
    }"
  >
    <aside :class="$style.aside">
      <window-controls
        :class="$style.aside__header"
      />
      <tabs-nav :class="$style.aside__body" />
    </aside>
    <tabs-list :class="$style.main" />
    <router-view :class="$style.main" />
    <window-dimmer />
  </div>
</template>

<script>
import TabsList from '@/components/TabsList.vue';
import TabsNav from '@/components/TabsNav.vue';
import WindowControls from '@/components/WindowControls.vue';
import WindowDimmer from '@/components/WindowDimmer.vue';
import NotificationSchedule from '@/utils/mixinNotificationSchedule';

export default {
  components: {
    TabsList,
    TabsNav,
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

<style lang="postcss" module>
@tailwind preflight;
@tailwind components;

.app {
  @apply
    font-sans text-grey
    bg-black select-none;

  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: [aside] config('width.64') [main] auto;
  grid-template-rows: 100vh;
}

.app--sidebar-right {
  grid-template-columns: [main] auto [aside] config('width.64');
}

.aside {
  @apply flex flex-col;
  grid-column: aside;
}

.aside__header {
  @apply flex-no-shrink;
}

.aside__body {
  @apply flex-grow;
}

.main {
  @apply
    z-10 overflow-y-auto
    bg-grey-darkest shadow-md;
  grid-column: main;
}
</style>

<style lang="postcss">
body {
  @apply h-screen overflow-hidden bg-black;
}

button:focus,
button:active:focus {
  outline: none !important;
}
</style>
