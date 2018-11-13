<template>
  <button
    :class="`bg-${schema} border-${schema}`"
    type="button"
    class="button"
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
      default: 'blue',
    },
  },
};
</script>

<style lang="postcss" scoped>
.button {
  @apply px-2 py-1 w-full;
  @apply text-white leading-tight;
  @apply border rounded-sm;
}
</style>
