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
      :class="{
        [$style.main]: true,
        [$style.main__sideBarLeft]: !isLayoutInverted,
        [$style.main__sideBarRight]: isLayoutInverted,
      }"
    >
      <slot name="main" />
    </div>

    <slot name="overlays" />
  </div>
</template>

<script>
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
  computed: {
    isLayoutInverted() {
      return this.$store.getters['Settings/byKey']('layout.sideBarLocation') === 'right';
    },
    displaysTabLabels() {
      return this.$store.getters['Settings/byKey']('navigation.displayTabLabels');
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
  max-width: config('width.64');
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
  @apply relative z-20 flex flex-col overflow-y-auto;
  grid-area: aside;
  max-width: config('width.64');
}

.main {
  @apply relative z-10 overflow-y-auto bg-grey-darkest;
  grid-area: main;
}

.main__sideBarLeft {
  @apply rounded-tl-sm;
}

.main__sideBarRight {
  @apply rounded-tr-sm;
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
