import { app, protocol } from 'electron';
import moduleReq from 'module';
// import { installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import createMainWindow from '@/background/create-main-window';
import createApplicationMenu from '@/background/create-application-menu';

app.setAppUserModelId(process.execPath);

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  // Don't load any native (external) modules until the following line is run:
  moduleReq.globalPaths.push(process.env.NODE_MODULES_PATH);
}

// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true } }]);

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  } else {
    mainWindow.show();
  }
});

app.on('before-quit', () => {
  app.quitting = true;
});

// create main BrowserWindow when electron is ready
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   // temp. fix: Electron 6.0.0 does not launch in Windows 10 Dark Mode
  //   // https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378
  //   await installVueDevtools();
  // }
  mainWindow = createMainWindow();

  createApplicationMenu();

  app.on('app-show-app-icon-badge', () => {
    switch (process.platform) {
      case 'darwin':
        return app.dock.setBadge('•');
      case 'win32':
        return mainWindow.flashFrame(true);
      default:
        return false;
    }
  });

  app.on('app-hide-app-icon-badge', () => {
    switch (process.platform) {
      case 'darwin':
        return app.dock.setBadge('');
      case 'win32':
        return mainWindow.flashFrame(false);
      default:
        return false;
    }
  });
});
