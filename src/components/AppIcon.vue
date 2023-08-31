<template>
  <svg
    v-if="content"
    :class="{
      [$style.icon]: true,
      [$style.inline]: inline,
      [$style[`size-${size}`]]: true,
      [$style.spin]: spin,
    }"
    viewBox="0 0 24 24"
  >
    <path :d="content" />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import * as icons from '@/utils/icons';

export default Vue.extend({
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
    spin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    content(): string {
      const iconName = `mdi${this.face}` as keyof typeof icons;
      return icons[iconName];
    },
  },
});
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

.spin {
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
