<template>
  <div :class="$style.title">
    <slot />
  </div>
</template>

<style lang="postcss" module>
.title {
  @apply mb-2 font-light text-3xl;
}
</style>
