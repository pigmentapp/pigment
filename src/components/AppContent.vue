<template>
  <div :class="$style.root">
    <div :class="$style.content">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" module>
.root {
  @apply flex-grow;
}

.content {
  @apply p-8 mx-auto max-w-6xl;
}
</style>
