<template>
  <button
    :class="[$style.button, $style[schema]]"
    type="button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    schema: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style lang="postcss" module>
.button {
  @apply
    px-2 py-1 w-full
    text-white leading-tight
    border rounded-sm;
}

.primary {
  @apply bg-blue border-blue;
}

.secondary {
  @apply bg-grey-darker border-grey-darker;
}
</style>
