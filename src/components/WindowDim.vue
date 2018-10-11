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
      windowHasFocus: null,
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
  },
  watch: {
    windowHasFocus(value) {
      clearTimeout(this.dim.timeout);

      if (!value) {
        this.timeout = setTimeout(() => {
          this.dim.isActive = true;
        }, this.delay);
      } else {
        this.dim.isActive = false;
      }
    },
  },
  created() {
    this.windowHasFocus = document.hasFocus();

    window.addEventListener('blur', () => {
      this.windowHasFocus = false;
    });

    window.addEventListener('focus', () => {
      this.windowHasFocus = true;
    });
  },
};
</script>
