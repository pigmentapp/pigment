<template>
  <svg
    v-if="content"
    :viewBox="attributes.viewBox"
    :class="{
      [$style.icon]: true,
      [$style.inline]: inline,
      [$style[`size-${size}`]]: true,
    }"
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
    inline: {
      type: Boolean,
      default: false,
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
  @apply block flex-shrink-0 mx-auto fill-current;
}

.inline {
  @apply inline-flex -mt-1;
}

.size-4 {
  @apply w-4 h-4;
}

.size-5 {
  @apply w-5 h-5;
}

.size-6 {
  @apply w-6 h-6;
}

.size-8 {
  @apply w-8 h-8;
}
</style>
