export default {
  data() {
    return {
      notificationInterval: null,
    };
  },
  computed: {
    windowHasFocus() {
      return this.$store.getters['Window/hasFocus'];
    },
    nextSchedule() {
      return this.$store.getters['Notifications/nextSchedule'];
    },
    notificationsPreventOnBlur() {
      return this.$store.getters['Notifications/preventOnBlur'];
    },
    notificationsScheduleActive() {
      return this.$store.getters['Notifications/scheduleActive'];
    },
  },
  watch: {
    windowHasFocus(isFocused) {
      if (isFocused) {
        return clearInterval(this.notificationInterval);
      }

      if (!this.notificationsPreventOnBlur || !this.notificationsScheduleActive) {
        return false;
      }

      this.notificationInterval = setInterval(() => {
        if (this.nextSchedule <= Date.now()) {
          new Notification('Pigment', { // eslint-disable-line no-new
            body: 'You may have new notifications.',
          });
          console.log('You may have new notifications.');
          this.$store.dispatch('Notifications/calcNextSchedule');
        }
      }, 2000);

      return true;
    },
  },
  beforeDestroy() {
    clearInterval(this.notificationInterval);
  },
};
