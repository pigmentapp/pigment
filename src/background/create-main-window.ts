import windowStateKeeper from 'electron-window-state';
import {
  app, BrowserWindow, shell, session,
} from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import checkForUpdates from '@/utils/updater';
import pkg from '@/../package.json';

const isDevelopment = process.env.NODE_ENV !== 'production';

let window: BrowserWindow;

export const getMainWindow = () => window;

export const createMainWindow = () => {
  const mainWindowState = windowStateKeeper({});

  window = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as unknown as boolean,
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
  app.userAgentFallback = (app.userAgentFallback.replace(new RegExp(removeUserAgents, 'g'), ''));

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) window.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    window.loadURL('app://./index.html');

    checkForUpdates(window);
  }

  window.on('ready-to-show', () => {
    if (!window) return;
    window.show();
    window.focus();
  });

  ipc.answerRenderer('app-close', () => {
    if (!window) return;
    window.close();
  });

  window.on('maximize', () => {
    if (!window) return;
    ipc.callRenderer(window, 'app-is-maximized', true);
  });

  window.on('unmaximize', () => {
    if (!window) return;
    ipc.callRenderer(window, 'app-is-maximized', false);
  });

  ipc.callRenderer(window, 'app-is-maximized', window.isMaximized());

  ipc.answerRenderer('app-toggle-maximized', () => {
    if (!window) return;
    if (window.isMaximized()) window.unmaximize();
    else window.maximize();
  });

  ipc.answerRenderer('app-minimize', () => {
    if (!window) return;
    window.minimize();
  });

  window.on('focus', () => {
    if (!window) return;
    ipc.callRenderer(window, 'app-has-focus', true);
  });

  window.on('blur', () => {
    if (!window) return;
    ipc.callRenderer(window, 'app-has-focus', false);
  });

  ipc.callRenderer(window, 'app-has-focus', window.isFocused());

  ipc.answerRenderer('app-wipe-cache', async () => {
    await session.defaultSession.clearCache();
    await session.defaultSession.clearStorageData();
    app.relaunch();
    app.exit();
  });

  window.webContents.on('devtools-opened', () => {
    if (!window) return;
    window.focus();
    setImmediate(() => {
      if (!window) return;
      window.focus();
    });
  });

  // open target="_blank" links in main window in default browser
  window.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  return window;
};

export default {};
