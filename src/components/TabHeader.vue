<template>
  <header class="flex leading-none">
    <button @click="$emit('goToHome')">
      Home
    </button>
    <button @click="$emit('doReload')">
      Reload
    </button>
    <button @click="isDimActive = !isDimActive">
      Dim {{ isDimActive ? 'on' : 'off' }}
    </button>
    <button @click="$emit('toggleSettings')">
      Settings
    </button>
    <button @click="$emit('toggleDevTools')">
      Dev
    </button>
    <div
      class="flex-grow p-2"
      style="-webkit-app-region: drag;"
    >
      {{ item.title }}
    </div>
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
  computed: {
    isDimActive: {
      get() {
        return this.$store.getters['Settings/isDimActive'];
      },
      set(value) {
        this.$store.commit('Settings/setDimActive', value);
      },
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
</style>
