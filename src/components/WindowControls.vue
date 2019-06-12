<template>
  <div :class="$style.wrap">
    <title-bar-button
      icon="window-minimize"
      schema="gray"
      title="Minimize window"
      @click="window.minimize()"
    />
    <title-bar-button
      :icon="isMaximized ? 'window-restore' : 'window-maximize'"
      :title="isMaximized ? 'Reduce window' : 'Maximize window'"
      schema="gray"
      @click="toggleMaximized()"
    />
    <title-bar-button
      icon="window-close"
      schema="red"
      title="Close window"
      @click="window.close()"
    />
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import TitleBarButton from '@/components/TitleBarButton.vue';

export default {
  components: {
    TitleBar,
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
  @apply flex justify-end pl-2;
}
</style>
