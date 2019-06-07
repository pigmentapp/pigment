<template>
  <div :class="$style.heading">
    <div :class="$style.title">
      <slot />
    </div>
    <div
      v-if="$slots.sub"
      :class="$style.sub"
    >
      <slot name="sub" />
    </div>
  </div>
</template>

<style lang="postcss" module>
.heading {
  @apply mb-4;
}

.title {
  @apply font-light text-3xl leading-tight;
}

.sub {
  @apply text-lg text-gray-600;
}
</style>
