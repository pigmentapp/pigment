<template>
  <div
    :class="{
      [$style.bar]: true,
      [$style[area]]: true,
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
    area: {
      type: String,
      required: true,
    },
    indent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="postcss" module>
.bar {
  @apply relative z-20 flex items-center px-1 leading-none;
  height: 2.4rem;
  box-shadow: 0 1px 0 #fff1;
  -webkit-app-region: drag;
}

.aside {
  background-color: #0002;
}

.indent {
  @apply pl-20;
}
</style>
