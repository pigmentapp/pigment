<template>
  <div
    :class="{
      [$style.app]: true,
      [$style.app__osMac]: $options.isMac,
      [$style.app__osNotMac]: !$options.isMac,
      [$style.app__layoutLeft_compact]: !isLayoutInverted && !displaysTabLabels,
      [$style.app__layoutLeft_extended]: !isLayoutInverted && displaysTabLabels,
      [$style.app__layoutRight_compact]: isLayoutInverted && !displaysTabLabels,
      [$style.app__layoutRight_extended]: isLayoutInverted && displaysTabLabels,
    }"
  >
    <div
      :class="{
        [$style.titleBarSpacer]: true,
        [$style.titleBarSpacer__osMac]: $options.isMac,
        [$style.titleBarSpacer__osNotMac]: !$options.isMac,
      }"
    >
      <window-controls v-if="!$options.isMac" />
    </div>
    <the-title-bar
      :class="{
        [$style.titleBar]: true,
        [$style.titleBar__osMac]: $options.isMac,
        [$style.titleBar__osNotMac]: !$options.isMac,
      }"
    />
    <the-side-bar :class="$style.sideBar" />
    <div
      ref="main"
      :class="{
        [$style.main]: true,
        [$style.main__sideBarLeft]: !isLayoutInverted,
        [$style.main__sideBarRight]: isLayoutInverted,
      }"
    >
      <slot name="main" />
    </div>

    <slot name="overlays" />
    <slot />
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { ipcRenderer as ipc } from 'electron-better-ipc';
import TheSideBar from '@/components/TheSideBar.vue';
import TheTitleBar from '@/components/TheTitleBar.vue';
import WindowControls from '@/components/WindowControls.vue';

export default {
  isMac: process.platform === 'darwin',
  components: {
    TheSideBar,
    TheTitleBar,
    WindowControls,
  },
  data: () => ({
    resizeObserver: null,
  }),
  computed: {
    isLayoutInverted() {
      return this.$store.getters['Settings/byKey']('layout.sideBarLocation') === 'right';
    },
    displaysTabLabels() {
      return this.$store.getters['Settings/byKey']('navigation.displayTabLabels');
    },
  },
  watch: {
    isLayoutInverted: 'setMainBoundingClientRect',
  },
  mounted() {
    this.setMainBoundingClientRect();

    this.resizeObserver = new ResizeObserver(debounce(() => {
      this.setMainBoundingClientRect();
    }, 50));

    this.resizeObserver.observe(this.$refs.main);
  },
  beforeDestroy() {
    this.resizeObserver.disconnect();
  },
  methods: {
    async setMainBoundingClientRect() {
      await this.$nextTick();
      const rect = this.$refs.main.getBoundingClientRect();

      await ipc.callMain('app-bv-update-bounds', {
        x: Math.trunc(rect.x),
        y: Math.trunc(rect.y),
        width: Math.trunc(rect.width),
        height: Math.trunc(rect.height),
      });
    },
  },
};
</script>

<style lang="postcss" module>
@tailwind base;
@tailwind components;

.app {
  @apply
    font-sans text-gray-400
    bg-gray-900 select-none;

  display: grid;
  grid-template-columns: min-content min-content 1fr min-content min-content;
  grid-template-rows: 2.4rem auto;
  height: 100vh;
}

.app__osMac {
  grid-template-rows: 2.4rem auto;
}

.app__osNotMac {
  grid-template-rows: min-content auto;
}

.app__osMac.app__layoutLeft_compact {
  grid-template-areas:
    "space space title title title"
    "aside main  main  main  main"
  ;
}

.app__osMac.app__layoutLeft_extended {
  grid-template-areas:
    "space space title title title"
    "aside aside main  main  main"
  ;
}

.app__osMac.app__layoutRight_compact {
  grid-template-areas:
    "space space title title ....."
    "main  main  main  main  aside"
  ;
}

.app__osMac.app__layoutRight_extended {
  grid-template-areas:
    "space space title ..... ....."
    "main  main  main  aside aside"
  ;
}

.app__osNotMac.app__layoutLeft_compact {
  grid-template-areas:
    "title title title space space"
    "aside main  main  main  main"
  ;
}

.app__osNotMac.app__layoutLeft_extended {
  grid-template-areas:
    "title title title space space"
    "aside aside main  main  main"
  ;
}

.app__osNotMac.app__layoutRight_compact {
  grid-template-areas:
    "title title title space space"
    "main  main  main  main  aside"
  ;
}

.app__osNotMac.app__layoutRight_extended {
  grid-template-areas:
    "title title title space space"
    "main  main  main  aside aside"
  ;
}

.titleBarSpacer {
  grid-area: space;
}

.titleBarSpacer__osMac {
  min-width: 5rem;
}

.titleBar {
  @apply relative z-30;
  grid-area: title;
}

.titleBar__osNotMac {
  @apply pl-3;
}

.sideBar {
  @apply relative z-20;
  grid-area: aside;
}

.main {
  @apply relative z-10 flex overflow-y-auto bg-gray-800;
  grid-area: main;
}

.main__sideBarLeft {
  @apply rounded-tl-sm;
}

.main__sideBarRight {
  @apply flex-row-reverse rounded-tr-sm;
}
</style>

<style lang="postcss">
body {
  @apply h-screen overflow-hidden bg-gray-900;
}

button:focus,
button:active:focus {
  outline: none !important;
}

::-webkit-scrollbar {
  @apply w-2 bg-gray-900 bg-opacity-50;
}

::-webkit-scrollbar-thumb {
  @apply border-2 border-solid border-transparent rounded-full;
  box-shadow: inset 0 0 10px 10px theme('colors.gray.700');
}
</style>
