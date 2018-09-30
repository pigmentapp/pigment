<template>
  <div>
    <button
      class="p-2 appearance-none"
      @click="window.minimize()"
    >
      &#128469;
    </button>
    <button
      class="p-2 appearance-none"
      @click="toggleMaximized()"
    >
      {{ isMaximized ? '&#128471;' : '&#128470;' }}
    </button>
    <button
      class="p-2 appearance-none"
      @click="window.close()"
    >
      &#128473;
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMaximized: false,
    }
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
  }
}
</script>

<style lang="postcss" scoped>
button {
  @apply text-grey-dark;

  -webkit-app-region: no-drag;
}
</style>
