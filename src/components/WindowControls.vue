<template>
  <div :class="$style.wrap">
    <title-bar-button
      schema="gray"
      title="Minimize window"
      @click="window.minimize()"
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
      @click="window.close()"
    >
      <span :class="$style.icon">&#xE8BB;</span>
    </title-bar-button>
  </div>
</template>

<script>
import TitleBarButton from '@/components/TitleBarButton.vue';

export default {
  components: {
    TitleBarButton,
  },
  data() {
    return {
      isMaximized: false,
    };
  },
  computed: {
    window() {
      return this.$electron.remote.getCurrentWindow();
    },
  },
  created() {
    this.watchMaximizedState();
  },
  methods: {
    watchMaximizedState() {
      this.isMaximized = this.window.isMaximized();

      this.window.on('maximize', () => {
        this.isMaximized = true;
      });

      this.window.on('unmaximize', () => {
        this.isMaximized = false;
      });
    },
    toggleMaximized() {
      if (this.isMaximized) {
        this.window.unmaximize();
      } else {
        this.window.maximize();
      }
    },
  },
};
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
