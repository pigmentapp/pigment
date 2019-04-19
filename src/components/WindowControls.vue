<template>
  <title-bar
    :class="{
      [$style.inverted]: isLayoutInverted,
    }"
    :indent="!isLayoutInverted"
  >
    <template v-if="!$options.isMac">
      <title-bar-button
        icon="window-close"
        schema="red"
        @click="window.close()"
      />
      <title-bar-button
        :icon="isMaximized ? 'window-restore' : 'window-maximize'"
        schema="orange"
        @click="toggleMaximized()"
      />
      <title-bar-button
        icon="window-minimize"
        schema="green"
        @click="window.minimize()"
      />
    </template>
    <div :class="$style.spacer" />
    <title-bar-button
      :to="{ name: 'tabs-create' }"
      icon="tab-plus"
    />
    <title-bar-button
      :to="{ name: 'notifications' }"
      icon="bell"
    />
    <title-bar-button
      :to="{ name: 'settings' }"
      icon="settings"
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
.inverted {
  @apply flex-row-reverse;
}

.spacer {
  @apply flex-grow;
}
</style>
