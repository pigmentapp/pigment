<template>
  <div>
    <button
      @click="isDimActive = !isDimActive"
    >
      <app-icon
        :size="5"
        :class="isDimActive && 'text-green'"
        :face="isDimActive ? 'toggle-switch' : 'toggle-switch-off'"
      />
      <div class="flex-grow pl-2">
        Dim contents when leaving window
      </div>
    </button>

    <button
      @click="isLayoutInverted = !isLayoutInverted"
    >
      <app-icon
        :size="5"
        :class="isLayoutInverted && 'text-green'"
        :face="isLayoutInverted ? 'toggle-switch' : 'toggle-switch-off'"
      />
      <div class="flex-grow pl-2">
        Invert app layout
      </div>
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    isDimActive: {
      get() {
        return this.$store.getters['Settings/isDimActive'];
      },
      set(value) {
        this.$store.commit('Settings/setDimActive', value);
      },
    },
    isLayoutInverted: {
      get() {
        return this.$store.getters['Settings/isLayoutInverted'];
      },
      set(value) {
        this.$store.commit('Settings/setLayoutInverted', value);
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
button {
  @apply flex items-start w-full p-3 text-left text-grey;
}

button + button {
    @apply border-t border-grey-darkest;
}
</style>
