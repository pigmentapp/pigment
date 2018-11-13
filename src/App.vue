<template>
  <div
    id="app"
    :class="{
      'flex-row-reverse': invertedLayout,
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

export default {
  components: {
    WindowControls,
    WindowDim,
  },
  computed: {
    invertedLayout() {
      return this.$store.getters['Settings/invertedLayout'];
    },
  },
};
</script>

<style lang="postcss" scoped>
#app {
  @apply flex h-screen text-grey bg-black select-none;
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
  @apply z-10 flex flex-col flex-grow;
}
</style>
