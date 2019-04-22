<template>
  <div :class="$style.wrap">
    <slot />
  </div>
</template>

<style lang="postcss" module>
.wrap {
  @apply h-full overflow-y-auto;
}
</style>
