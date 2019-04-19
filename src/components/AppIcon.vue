<template>
  <svg
    v-if="content"
    :viewBox="attributes.viewBox"
    :class="[$style.icon, $style[`size-${size}`]]"
    v-html="content"
  />
</template>

<script>
export default {
  props: {
    face: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      content: null,
      attributes: {},
    };
  },
  watch: {
    face: {
      immediate: true,
      handler(icon) {
        if (!icon.length) {
          this.content = null;
          this.attributes = {};
          return;
        }

        import(`!svg-loader!@/assets/icons/${icon}.svg`).then((res) => {
          this.content = res.content;
          this.attributes = res.attributes;
        });
      },
    },
  },
};
</script>

<style lang="postcss" module>
.icon {
  @apply block flex-no-shrink mx-auto fill-current;
}

.size-4 {
  @apply w-4 h-4;
}

.size-5 {
  @apply w-5 h-5;
}
</style>
