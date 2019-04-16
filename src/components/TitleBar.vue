<template>
  <div
    :class="{
      [$style.bar]: true,
      [$style.indent]: $options.isMac && indent
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  isMac: process.platform === 'darwin',
  props: {
    indent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="postcss" module>
.bar {
  @apply flex items-center px-1 leading-none;
  height: 2.4rem;
  background-color: #0009;
}

.indent {
  @apply pl-20;
}
</style>
