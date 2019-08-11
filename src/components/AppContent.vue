<template>
  <div :class="$style.content">
    <slot />
  </div>
</template>

<style lang="postcss" module>
.content {
  @apply p-8 mx-auto max-w-6xl;
}
</style>
