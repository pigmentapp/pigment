<template>
  <component
    :is="el"
    :style="dimStyle"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 5000,
    },
    el: {
      type: String,
      default: 'div',
    },
    fadeIn: {
      type: Number,
      default: 175,
    },
    fadeOut: {
      type: Number,
      default: 750,
    },
  },
  data() {
    return {
      dim: {
        timeout: null,
        isActive: false,
      },
    };
  },
  computed: {
    dimStyle() {
      return this.dim.isActive
        ? {
          opacity: 0,
          'pointer-events': 'none',
          'transition-property': 'opacity',
          'transition-duration': `${this.fadeOut}ms`,
        }
        : {
          'transition-property': 'opacity',
          'transition-duration': `${this.fadeIn}ms`,
        };
    },
    settingsIsDimActive() {
      return this.$store.getters['Settings/isDimActive'];
    },
    windowHasFocus() {
      return this.$store.getters['Window/hasFocus'];
    },
  },
  watch: {
    windowHasFocus(value) {
      clearTimeout(this.dim.timeout);

      if (!value && this.settingsIsDimActive) {
        this.dim.timeout = setTimeout(() => {
          this.dim.isActive = true;
        }, this.delay);
      } else {
        this.dim.isActive = false;
      }
    },
    settingsIsDimActive(value) {
      if (!value) {
        clearTimeout(this.dim.timeout);
        this.dim.isActive = false;
      }
    },
  },
  created() {
    this.$electron.remote.app.on('browser-window-blur', () => {
      this.$store.commit('Window/setHasFocus', false);
    });

    this.$electron.remote.app.on('browser-window-focus', () => {
      this.$store.commit('Window/setHasFocus', true);
    });
  },
};
</script>
