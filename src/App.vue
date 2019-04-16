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
      <router-view
        :class="$style.aside__body"
        name="aside"
      />
    </aside>
    <router-view :class="$style.main" />
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
  created() {
    console.log(this.$style);
  },
};
</script>

<style lang="postcss" module>
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
    z-10 flex flex-col overflow-y-auto
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
