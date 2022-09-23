<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label :class="$style.item">
    <div
      v-if="label"
      :class="$style.label"
    >
      {{ label }}
    </div>
    <div
      v-if="descr"
      :class="$style.descr"
    >
      {{ descr }}
    </div>
    <slot />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    descr: {
      type: String,
      default: undefined,
    },
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

.label + .descr {
  @apply -mt-1;
}

.descr {
  @apply mb-1 text-gray-500;
}
</style>
