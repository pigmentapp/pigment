import path from 'path';
import windowStateKeeper from 'electron-window-state';
import { app, BrowserWindow, shell } from 'electron';
import { format as formatUrl } from 'url';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import checkForUpdates from '@/utils/updater';
import pkg from '@/../package.json';

const isDevelopment = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line no-unused-vars
const createMainWindow = (mainWindow) => {
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
    // Load the index.html when not in development
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));

    checkForUpdates();
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
      // eslint-disable-next-line no-param-reassign
      mainWindow = null;
    }
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
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

export default createMainWindow;
