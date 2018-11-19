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
      @click="muteOnWindowBlur = !muteOnWindowBlur"
    >
      <app-icon
        :size="5"
        :class="muteOnWindowBlur && 'text-green'"
        :face="muteOnWindowBlur ? 'toggle-switch' : 'toggle-switch-off'"
      />
      <div class="flex-grow pl-2">
        Mute tab audio when leaving window
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

    <button
      @click="notificationsPreventOnBlur = !notificationsPreventOnBlur"
    >
      <app-icon
        :size="5"
        :class="notificationsPreventOnBlur && 'text-green'"
        :face="notificationsPreventOnBlur ? 'toggle-switch' : 'toggle-switch-off'"
      />
      <div class="flex-grow pl-2">
        Prevent notifications when leaving window
      </div>
    </button>

    <router-link
      :to="{ name: 'welcome' }"
      tag="button"
    >
      Show welcome page
    </router-link>
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
    muteOnWindowBlur: {
      get() {
        return this.$store.getters['Settings/muteOnWindowBlur'];
      },
      set(value) {
        this.$store.commit('Settings/setMuteOnWindowBlur', value);
      },
    },
    notificationsPreventOnBlur: {
      get() {
        return this.$store.getters['Notifications/preventOnBlur'];
      },
      set(value) {
        this.$store.commit('Notifications/preventOnBlur', value);
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
