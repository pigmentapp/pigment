<template>
  <div :class="$style.wrap">
    <title-bar-button
      schema="gray"
      title="Minimize window"
      @click="minimizeWindow"
    >
      <span :class="$style.icon">&#xE921;</span>
    </title-bar-button>
    <title-bar-button
      :title="isMaximized ? 'Reduce window' : 'Maximize window'"
      schema="gray"
      @click="toggleMaximized()"
    >
      <span :class="$style.icon">{{ isMaximized ? '&#xE923;' : '&#xE922;' }}</span>
    </title-bar-button>
    <title-bar-button
      schema="red"
      title="Close window"
      @click="closeWindow"
    >
      <span :class="$style.icon">&#xE8BB;</span>
    </title-bar-button>
  </div>
</template>

<script lang="ts">
import { ipcRenderer as ipc } from 'electron-better-ipc';
import Vue from 'vue';
import TitleBarButton from '@/components/TitleBarButton.vue';

export default Vue.extend({
  components: {
    TitleBarButton,
  },
  data() {
    return {
      isMaximized: false,
    };
  },
  created() {
    ipc.answerMain('app-is-maximized', (isMaximized: boolean) => {
      this.isMaximized = isMaximized;
    });
  },
  methods: {
    closeWindow() {
      ipc.callMain('app-close');
    },
    minimizeWindow() {
      ipc.callMain('app-minimize');
    },
    toggleMaximized() {
      ipc.callMain('app-toggle-maximized');
    },
  },
});
</script>

<style lang="postcss" module>
.wrap {
  font-family: Segoe MDL2 Assets;
  font-size: 10px;
  @apply flex justify-end pl-2;
}

.icon {
  @apply flex justify-center items-center w-6 h-4;
}
</style>
