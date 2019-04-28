<template>
  <div :class="$style.bar">
    <portal-target
      :class="$style.body"
      name="titleBar"
    />
    <window-controls />
  </div>
</template>

<script>
import WindowControls from '@/components/WindowControls.vue';

export default {
  components: {
    WindowControls,
  },
};
</script>


<style lang="postcss" module>
.bar {
  @apply relative z-20 flex items-center px-1;
  height: 2.4rem;
  -webkit-app-region: drag;
}

.body {
  @apply flex flex-grow items-center;
}
</style>
