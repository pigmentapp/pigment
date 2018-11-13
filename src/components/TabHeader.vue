<template>
  <header class="flex px-1 leading-none">
    <button @click="$emit('goToHome')">
      <app-icon face="home-variant" />
    </button>
    <button @click="$emit('doReload')">
      <app-icon face="refresh" />
    </button>
    <div class="title">
      {{ item.title }}
    </div>
    <button @click="$emit('toggleDevTools')">
      <app-icon face="code-tags" />
    </button>
    <button @click="$emit('toggleSettings')">
      <app-icon face="dots-vertical" />
    </button>
  </header>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="postcss" scoped>
header {
  background-color: #0009;
}
button {
  @apply p-2 leading-none appearance-none text-grey;
}

button:hover {
  @apply text-blue-lighter bg-blue;
}

.title {
  @apply flex-1 p-2 text-sm truncate;
  -webkit-app-region: drag;
}
</style>
