<template>
  <div
    :class="{
      flex: true,
      'flex-row-reverse': isLayoutInverted,
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
      v-if="!isSettingsView"
      class="hover:text-blue-lighter hover:bg-blue"
      @click="createTab"
    >
      <app-icon face="tab-plus" />
    </button>
    <button
      :class="isSettingsView && 'active'"
      class="hover:text-blue-lighter hover:bg-blue"
      @click="toggleSettings"
    >
      <app-icon :face="isSettingsView ? 'arrow-left' : 'settings'" />
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
    isLayoutInverted() {
      return this.$store.getters['Settings/isLayoutInvertedForOs'];
    },
    isSettingsView() {
      return this.$route.name === 'settings';
    },
  },
  created() {
    this.watchMaximizedState();
  },
  methods: {
    createTab() {
      this.$store.dispatch('Tabs/add').then((newTabIdent) => {
        this.$router.push({
          name: 'tabs',
          params: {
            ident: newTabIdent,
          },
        });
      });
    },
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
    toggleSettings() {
      if (this.isSettingsView) {
        this.$router.back();
      } else {
        this.$router.push({
          name: 'settings',
        });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
button {
  @apply p-2 appearance-none text-grey-dark;
}

button.active {
  @apply text-blue-lighter bg-blue;
}
</style>
