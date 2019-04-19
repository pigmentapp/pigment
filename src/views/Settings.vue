<template>
  <div>
    <button
      @click="isDimActive = !isDimActive"
    >
      <app-icon
        :size="5"
        :class="isDimActive && $style.active"
        :face="isDimActive ? 'toggle-switch' : 'toggle-switch-off'"
      />
      <div :class="$style.label">
        Dim contents when leaving window
      </div>
    </button>

    <button
      @click="muteOnWindowBlur = !muteOnWindowBlur"
    >
      <app-icon
        :size="5"
        :class="muteOnWindowBlur && $style.active"
        :face="muteOnWindowBlur ? 'toggle-switch' : 'toggle-switch-off'"
      />
      <div :class="$style.label">
        Mute tab audio when leaving window
      </div>
    </button>

    <button
      @click="isLayoutInverted = !isLayoutInverted"
    >
      <app-icon
        :size="5"
        :class="isLayoutInverted && $style.active"
        :face="isLayoutInverted ? 'toggle-switch' : 'toggle-switch-off'"
      />
      <div :class="$style.label">
        Invert app layout
      </div>
    </button>

    <button
      @click="notificationsPreventOnBlur = !notificationsPreventOnBlur"
    >
      <app-icon
        :size="5"
        :class="notificationsPreventOnBlur && $style.active"
        :face="notificationsPreventOnBlur ? 'toggle-switch' : 'toggle-switch-off'"
      />
      <div :class="$style.label">
        Prevent notifications when leaving window
      </div>
    </button>

    <button
      :disabled="!notificationsPreventOnBlur"
      @click="notificationsScheduleActive = !notificationsScheduleActive"
    >
      <app-icon
        :size="5"
        :class="{
          [$style.subsetting]: true,
          [$style.active]: notificationsScheduleActive && notificationsPreventOnBlur,
        }"
        :face="
          notificationsScheduleActive && notificationsPreventOnBlur
            ? 'toggle-switch'
            : 'toggle-switch-off'
        "
      />
      <div :class="$style.label">
        Send summary of new notifications by schedule after leaving the window
      </div>
    </button>

    <div :class="$style.interval">
      Interval in minutes
      <input
        :disabled="!notificationsPreventOnBlur || !notificationsScheduleActive"
        v-model="notificationsScheduleInMs"
        :class="$style.input"
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
    <div :class="$style.copyright">
      Pigment is made by
      <a
        :class="$style.link"
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

<style lang="postcss" module>
.active {
  @apply text-green;
}

.label {
  @apply flex-grow pl-2;
}

.subsetting {
  @apply ml-6;
}

.interval {
  @apply p-3 pl-16;
}

.input {
  @apply w-full px-2 py-1 mt-2 text-grey bg-grey-darkest;
}

.copyright {
  @apply p-3 text-sm text-grey-darker;
}

.link {
  @apply text-grey-darker;
}
</style>
