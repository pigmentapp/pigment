<template>
  <portal-target
    :class="$style.bar"
    name="titleBar"
  />
</template>

<style lang="postcss" module>
.bar {
  @apply flex flex-grow items-center px-1;
  -webkit-app-region: drag;
}
</style>
