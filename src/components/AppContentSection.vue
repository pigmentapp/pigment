<template>
  <div :class="$style.wrap">
    <slot />
  </div>
</template>

<style lang="postcss" module>
.wrap + .wrap {
  @apply mt-8;
}
</style>
