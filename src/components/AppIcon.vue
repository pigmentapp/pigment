<template>
  <svg
    v-if="content"
    :class="{
      [$style.icon]: true,
      [$style.inline]: inline,
      [$style[`size-${size}`]]: true,
    }"
    viewBox="0 0 24 24"
  >
    <path :d="content" />
  </svg>
</template>

<script>
import * as icons from '@/utils/icons';

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
  computed: {
    content() {
      return icons[`mdi${this.face}`];
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
