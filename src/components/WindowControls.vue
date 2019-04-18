<template>
  <title-bar
    :class="{
      'flex-row-reverse': isLayoutInverted,
    }"
    :indent="!isLayoutInverted"
  >
    <template v-if="!$options.isMac">
      <title-bar-button
        icon="window-close"
        class="hover:text-red-lighter hover:bg-red-dark"
        @click="window.close()"
      />
      <title-bar-button
        :icon="isMaximized ? 'window-restore' : 'window-maximize'"
        class="hover:text-orange-lighter hover:bg-orange-dark"
        @click="toggleMaximized()"
      />
      <title-bar-button
        icon="window-minimize"
        class="hover:text-green-lighter hover:bg-green-dark"
        @click="window.minimize()"
      />
    </template>
    <div
      class="flex-grow"
      style="-webkit-app-region: drag;"
    />
    <title-bar-button
      icon="tab-plus"
      @click="createTab"
    />
    <title-bar-button
      icon="settings"
      @click="showSettings"
    />
  </title-bar>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import TitleBarButton from '@/components/TitleBarButton.vue';

export default {
  components: {
    TitleBar,
    TitleBarButton,
  },
  isMac: process.platform === 'darwin',
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
    showSettings() {
      this.$router.push({
        name: 'settings',
      });
    },
  },
};
</script>
