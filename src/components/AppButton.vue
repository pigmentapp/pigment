<template>
  <component
    :is="tag"
    :class="{
      [$style.button]: true,
      [$style.primary]: primary,
      [$style.secondary]: secondary,
    }"
    :type="tag === 'button' && 'button'"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'button',
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
