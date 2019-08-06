<template>
  <label :class="$style.item">
    <div
      v-if="label"
      :class="$style.label"
    >
      {{ label }}
    </div>
    <slot />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="postcss" module>
.item {
  @apply block;
}

.item + .item {
  @apply mt-4;
}

.label {
  @apply mb-1 font-medium;
}
</style>
