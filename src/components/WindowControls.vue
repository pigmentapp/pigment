<template>
  <div
    :class="{
      flex: true,
      'flex-row-reverse': invertedLayout,
      'px-1': true,
    }"
  >
    <button
      class="hover:text-red-lighter hover:bg-red-dark"
      @click="window.close()"
    >
      <app-icon face="window-close" />
    </button>
    <button
      class="hover:text-orange-lighter hover:bg-orange-dark"
      @click="toggleMaximized()"
    >
      <app-icon :face="isMaximized ? 'window-restore' : 'window-maximize'" />
    </button>
    <button
      class="hover:text-green-lighter hover:bg-green-dark"
      @click="window.minimize()"
    >
      <app-icon face="window-minimize" />
    </button>
    <div
      class="flex-grow"
      style="-webkit-app-region: drag;"
    />
    <button
      class="leading-none"
      @click="isDimActive = !isDimActive"
    >
      Dim {{ isDimActive ? 'on' : 'off' }}
    </button>
    <button
      class="hover:text-blue-lighter hover:bg-blue"
      @click="$store.dispatch('Tabs/add')"
    >
      <app-icon face="tab-plus" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMaximized: false,
    };
  },
  computed: {
    window() {
      return this.$electron.remote.getCurrentWindow();
    },
    invertedLayout() {
      return this.$store.getters['Settings/invertedLayout'];
    },
    isDimActive: {
      get() {
        return this.$store.getters['Settings/isDimActive'];
      },
      set(value) {
        this.$store.commit('Settings/setDimActive', value);
      },
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

<style lang="postcss" scoped>
button {
  @apply p-2 appearance-none text-grey-dark;
}
</style>
