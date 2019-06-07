export default {
  created() {
    const { app } = this.$electron.remote;
    const r = this.$router;

    app.on('app-router-goto-tabs-create', () => r.push({ name: 'tabs-create' }));
    app.on('app-router-goto-settings', () => r.push({ name: 'settings' }));
    app.on('app-router-goto-welcome', () => r.push({ name: 'welcome' }));
    app.on('app-router-goto-changelog', () => r.push({ name: 'changelog' }));
  },
};
