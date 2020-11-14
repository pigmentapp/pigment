import { app } from 'electron';
import { autoUpdater } from 'electron-updater';

autoUpdater.autoDownload = false;

autoUpdater.on('checking-for-update', () => {
  app.emit('app-update-checking');
});

autoUpdater.on('update-available', (info) => {
  app.emit('app-update-available', info);
});

autoUpdater.on('download-progress', (info) => {
  app.emit('app-update-download-progress', info);
});

autoUpdater.on('update-downloaded', (info) => {
  app.emit('app-update-downloaded', info);
  autoUpdater.quitAndInstall();
});

autoUpdater.on('update-not-available', (info) => {
  app.emit('app-update-not-available', info);
});

autoUpdater.on('error', (info) => {
  app.emit('app-update-error', info);
});

app.on('app-update-check', () => {
  autoUpdater.checkForUpdates();
});

app.on('app-update-start-download', () => {
  autoUpdater.downloadUpdate();
});

export default () => {
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 1000 * 20);

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 1000 * 60 * 30);
};
