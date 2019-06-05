<template>
  <button
    :class="[$style.button, $style[schema]]"
    type="button"
    @click="$emit('click', $event)"
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
    px-4 py-2 w-full
    font-medium leading-tight uppercase
    border rounded;
}

.primary {
  @apply text-white bg-gray-600 border-gray-500 shadow;
}

.primary:hover {
  @apply bg-gray-700 border-gray-600;
}

.secondary {
  @apply text-gray-500 border-gray-600;
}

.secondary:hover {
  @apply text-white bg-gray-700 border-gray-600;
}
</style>
