<template>
  <div :class="$style.text">
    <slot />
  </div>
</template>

<style lang="postcss" module>
.text {
  @apply flex-grow pr-2 mr-auto text-sm truncate;
  -webkit-user-select: none;
}
</style>
