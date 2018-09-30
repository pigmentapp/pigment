<template>
  <button
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
  },
};
</script>

<style lang="postcss" scoped>
.button {
  @apply px-2 py-1 w-full;
  @apply text-grey-light leading-tight;
  @apply bg-grey-darkest border border-grey-darkest rounded-sm;
}
</style>
