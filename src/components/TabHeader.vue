<template>
  <header class="p-2">
    <button
      class="text-grey mr-3"
      @click="$emit('goToHome')"
    >
      Home
    </button>
    <button
      class="text-grey mr-3"
      @click="$emit('doReload')"
    >
      Reload
    </button>
    <button
      class="text-grey mr-3"
      @click="isDimActive = !isDimActive"
    >
      Dim {{ isDimActive ? 'on' : 'off' }}
    </button>
    <button
      class="text-grey mr-3"
      @click="$emit('toggleSettings')"
    >
      Settings
    </button>
    <button
      class="text-grey mr-3"
      @click="$emit('toggleDevTools')"
    >
      Dev
    </button>
    {{ item.title }}
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

<style scoped>
header {
  background-color: #0009;
}
</style>
