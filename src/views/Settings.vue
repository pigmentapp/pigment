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

    <button
      :disabled="!notificationsPreventOnBlur"
      @click="notificationsScheduleActive = !notificationsScheduleActive"
    >
      <app-icon
        :size="5"
        :class="(notificationsScheduleActive && notificationsPreventOnBlur) && 'text-green'"
        :face="
          notificationsScheduleActive && notificationsPreventOnBlur
            ? 'toggle-switch'
            : 'toggle-switch-off'
        "
        class="ml-6"
      />
      <div class="flex-grow pl-2">
        Send summary of new notifications by schedule after leaving the window
      </div>
    </button>

    <div class="p-3 pl-16">
      Interval in minutes
      <input
        :disabled="!notificationsPreventOnBlur || !notificationsScheduleActive"
        v-model="notificationsScheduleInMs"
        class="w-full px-2 py-1 mt-2 text-grey bg-grey-darkest"
        type="number"
        @blur="setMinimumNotificationInterval"
      >
    </div>

    <router-link
      :to="{ name: 'welcome' }"
      tag="button"
    >
      Show welcome page
    </router-link>
    <button
      @click="wipeAppData"
    >
      Reset pigment (wipes everything)
    </button>
    <div class="p-3 text-sm text-grey-darker">
      Pigment is made by
      <a
        class="text-grey-darker"
        href="//leonardhertel.de"
        @click.prevent="$electron.remote.shell.openExternal('https://leonardhertel.de')"
      >
        Leonard Hertel
      </a>
    </div>
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
    notificationsScheduleActive: {
      get() {
        return this.$store.getters['Notifications/scheduleActive'];
      },
      set(value) {
        this.$store.commit('Notifications/scheduleActive', value);
      },
    },
    notificationsScheduleInMs: {
      get() {
        return this.$store.getters['Notifications/scheduleInMs'] / 60 / 1000;
      },
      set(value) {
        this.$store.commit('Notifications/scheduleInMs', value * 60 * 1000);
      },
    },
  },
  methods: {
    setMinimumNotificationInterval() {
      if (this.notificationsScheduleInMs < 0.15) {
        this.notificationsScheduleInMs = 0.15;
      }
    },
    wipeAppData() {
      if (confirm('Everything will be gone forever!')) { // eslint-disable-line no-alert, no-restricted-globals
        this.$electron.remote.session.defaultSession.clearCache(() => {
          this.$electron.remote.session.defaultSession.clearStorageData({
            storages: ['localstorage', 'caches', 'indexdb'],
          }, () => {
            this.$router.replace('/');
            this.$electron.remote.getCurrentWindow().reload();
          });
        });
      }
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
