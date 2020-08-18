import electronDl from 'electron-dl';
import { autoUpdater } from 'electron-updater';
import windowStateKeeper from 'electron-window-state';
import * as path from 'path';
import { format as formatUrl } from 'url';

import {
  app, Menu, protocol, BrowserWindow, shell,
} from 'electron';
/* eslint-disable import/no-extraneous-dependencies */
import {
  createProtocol,
  // installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
/* eslint-enable import/no-extraneous-dependencies */

import pkg from '../package.json';

electronDl({
  openFolderWhenDone: true,
  saveAs: true,
});

app.setAppUserModelId(process.execPath);

const moduleReq = require('module');

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  // Don't load any native (external) modules until the following line is run:
  moduleReq.globalPaths.push(process.env.NODE_MODULES_PATH);
}

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true } }]);
function createMainWindow() {
  const mainWindowState = windowStateKeeper();

  const window = new BrowserWindow({
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
    backgroundColor: '#22292f',
    frame: false,
    show: false,
    titleBarStyle: 'hiddenInset',
    // dimensions and position
    height: mainWindowState.height,
    width: mainWindowState.width,
    x: mainWindowState.x,
    y: mainWindowState.y,
  });

  mainWindowState.manage(window);

  // remove electron and app specific user agents to prevent sideeffects like
  // https://github.com/ramboxapp/community-edition/issues/1981
  // https://github.com/meetfranz/franz/issues/1185
  // https://github.com/meetfranz/franz/issues/1138
  const removeUserAgents = `(Electron|${pkg.name}|${pkg.productName})/([0-9a-z-.]+) `;
  window.webContents.userAgent = (window.webContents.userAgent.replace(new RegExp(removeUserAgents, 'g'), ''));

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) window.webContents.openDevTools();
  } else {
    createProtocol('app');
    //   Load the index.html when not in development
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));

    autoUpdater.checkForUpdatesAndNotify();
  }

  window.on('ready-to-show', () => {
    window.show();
    window.focus();
  });

  window.on('close', (e) => {
    if (process.platform === 'darwin' && !app.quitting) {
      e.preventDefault();
      window.hide();
    }
  });

  window.on('closed', () => {
    if (process.platform !== 'darwin' || app.quitting) {
      mainWindow = null;
    }
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

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
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // temp. fix: Electron 6.0.0 does not launch in Windows 10 Dark Mode
    // https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378
    // await installVueDevtools();
  }
  mainWindow = createMainWindow();

  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'minimize' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { type: 'separator' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'toggledevtools' },
      ],
    },
    {
      label: 'Tabs',
      submenu: [
        { label: 'New Tab', accelerator: 'CmdOrCtrl+N', click: () => app.emit('app-router-goto-tabs-create') },
        { type: 'separator' },
        { label: 'Show tab 1', accelerator: 'CmdOrCtrl+1', click: () => app.emit('app-router-goto-tab-list-index', 1) },
        { label: 'Show tab 2', accelerator: 'CmdOrCtrl+2', click: () => app.emit('app-router-goto-tab-list-index', 2) },
        { label: 'Show tab 3', accelerator: 'CmdOrCtrl+3', click: () => app.emit('app-router-goto-tab-list-index', 3) },
        { label: 'Show tab 4', accelerator: 'CmdOrCtrl+4', click: () => app.emit('app-router-goto-tab-list-index', 4) },
        { label: 'Show tab 5', accelerator: 'CmdOrCtrl+5', click: () => app.emit('app-router-goto-tab-list-index', 5) },
        { label: 'Show tab 6', accelerator: 'CmdOrCtrl+6', click: () => app.emit('app-router-goto-tab-list-index', 6) },
        { label: 'Show tab 7', accelerator: 'CmdOrCtrl+7', click: () => app.emit('app-router-goto-tab-list-index', 7) },
        { label: 'Show tab 8', accelerator: 'CmdOrCtrl+8', click: () => app.emit('app-router-goto-tab-list-index', 8) },
        { label: 'Show tab 9', accelerator: 'CmdOrCtrl+9', click: () => app.emit('app-router-goto-tab-list-index', 9) },
        {
          label: 'Alternatives',
          visible: false,
          submenu: [
            { label: 'New Tab', accelerator: 'CmdOrCtrl+T', click: () => app.emit('app-router-goto-tabs-create') },
            { type: 'separator' },
            { label: 'Show tab 1', accelerator: 'CmdOrCtrl+num1', click: () => app.emit('app-router-goto-tab-list-index', 1) },
            { label: 'Show tab 2', accelerator: 'CmdOrCtrl+num2', click: () => app.emit('app-router-goto-tab-list-index', 2) },
            { label: 'Show tab 3', accelerator: 'CmdOrCtrl+num3', click: () => app.emit('app-router-goto-tab-list-index', 3) },
            { label: 'Show tab 4', accelerator: 'CmdOrCtrl+num4', click: () => app.emit('app-router-goto-tab-list-index', 4) },
            { label: 'Show tab 5', accelerator: 'CmdOrCtrl+num5', click: () => app.emit('app-router-goto-tab-list-index', 5) },
            { label: 'Show tab 6', accelerator: 'CmdOrCtrl+num6', click: () => app.emit('app-router-goto-tab-list-index', 6) },
            { label: 'Show tab 7', accelerator: 'CmdOrCtrl+num7', click: () => app.emit('app-router-goto-tab-list-index', 7) },
            { label: 'Show tab 8', accelerator: 'CmdOrCtrl+num8', click: () => app.emit('app-router-goto-tab-list-index', 8) },
            { label: 'Show tab 9', accelerator: 'CmdOrCtrl+num9', click: () => app.emit('app-router-goto-tab-list-index', 9) },
          ],
        },
      ],
    },
  ]));

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

  // open target="_blank" links in main window in default browser
  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });
});
