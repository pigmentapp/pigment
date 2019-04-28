<template>
  <portal-target
    :class="$style.bar"
    name="titleBar"
  />
</template>

<style lang="postcss" module>
.bar {
  @apply relative z-20 flex flex-grow items-center px-1;
  -webkit-app-region: drag;
}
</style>
