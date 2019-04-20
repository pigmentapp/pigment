<template>
  <div
    :class="{
      [$style.dimmer]: true,
      [$style.active]: isActive,
    }"
  >
    <div :class="$style.screen" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      delay: 5000,
      timeout: null,
      isActive: false,
    };
  },
  computed: {
    settingsIsDimActive() {
      return this.$store.getters['Settings/byKey']('dimmer.dimIfWindowIsNotInFocus');
    },
    windowHasFocus() {
      return this.$store.getters['Window/hasFocus'];
    },
  },
  watch: {
    windowHasFocus(value) {
      clearTimeout(this.timeout);

      if (!value && this.settingsIsDimActive) {
        this.timeout = setTimeout(() => {
          this.isActive = true;
        }, this.delay);
      } else {
        this.isActive = false;
      }
    },
    settingsIsDimActive(value) {
      if (!value) {
        clearTimeout(this.timeout);
        this.isActive = false;
      }
    },
  },
  created() {
    this.$electron.remote.app.on('browser-window-blur', this.onBlur);
    this.$electron.remote.app.on('browser-window-focus', this.onFocus);

    window.addEventListener('beforeunload', () => {
      clearTimeout(this.timeout);
      this.$electron.remote.app.off('browser-window-blur', this.onBlur);
      this.$electron.remote.app.off('browser-window-focus', this.onFocus);
    });
  },
  methods: {
    onBlur() {
      this.$store.dispatch('Window/hasFocus', false);
    },
    onFocus() {
      this.$store.dispatch('Window/hasFocus', true);
    },
  },
};
</script>

<style lang="scss" module>
.dimmer {
  position: fixed;
  top: -400vh;
  right: 0;
  left: 0;
  height: 400vh;
  z-index: 20;
  background-image: linear-gradient(
    config('colors.black'),
    config('colors.black') 25%,
    transparent 100%,
  );

  &.active {
    top: 0;
    transition-duration: 1500ms;
    transition-property: top;
    transition-timing-function: ease-out;
  }
}


.screen {
  height: 100vh;
  background-image: url(@/assets/logo/logo.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 192px, contain;
  opacity: 0;
  transform: rotate(-45deg);

  .active & {
    opacity: 0.5;
    transition-delay: 1750ms;
    transition-duration: 500ms;
    transition-property: opacity, transform;
    transition-timing-function: ease-out;
    transform: rotate(0);
  }
}
</style>
