import { autoUpdater } from 'electron-updater';
import { ipcMain as ipc } from 'electron-better-ipc';
import { BrowserWindow } from 'electron';

autoUpdater.autoDownload = false;

export default (window: BrowserWindow) => {
  autoUpdater.on('checking-for-update', () => {
    ipc.callRenderer(window, 'app-update-checking', true);
  });

  autoUpdater.on('update-available', (info) => {
    ipc.callRenderer(window, 'app-update-available', info);
  });

  autoUpdater.on('download-progress', (info) => {
    ipc.callRenderer(window, 'app-update-download-progress', info);
  });

  autoUpdater.on('update-downloaded', (info) => {
    ipc.callRenderer(window, 'app-update-downloaded', info);
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('update-not-available', (info) => {
    ipc.callRenderer(window, 'app-update-not-available', info);
  });

  autoUpdater.on('error', (info) => {
    ipc.callRenderer(window, 'app-update-error', info);
  });

  ipc.answerRenderer('app-update-check', () => {
    autoUpdater.checkForUpdates();
  });

  ipc.answerRenderer('app-update-start-download', () => {
    autoUpdater.downloadUpdate();
  });

  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 1000 * 20);

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 1000 * 60 * 30);
};
