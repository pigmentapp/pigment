import path from 'path';
import { BrowserView, shell } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';
import contextMenu from 'electron-context-menu';
import url from 'url';
import { getMainWindow } from '@/background/create-main-window';
import { nanoid } from 'nanoid';

let bounds = {};

const views = {};
const contextMenus = {};
const customScripts = {};

const updateAllViewsBounds = () => {
  getMainWindow().getBrowserViews().forEach((view) => view.setBounds(bounds));
};

const updateBounds = (rect) => {
  bounds = rect;
  updateAllViewsBounds();
};

const setCustomScripts = ({ viewId, css = '', js = '' }) => {
  customScripts[viewId] = { css, js };
};

const destroyById = (id) => {
  const view = views[id];
  if (!view) return;
  try {
    contextMenus[id]();
  } catch (error) {
    console.error(error);
  }
  getMainWindow().removeBrowserView(view);
  delete views[id];
};

const destroyAll = () => {
  Object.keys(views).forEach((viewId) => destroyById(viewId));
};

const showById = (id) => {
  const view = views[id];
  if (!view) return;
  getMainWindow().addBrowserView(view);
  view.setBounds(bounds);
  view.webContents.focus();
};

const hideById = (id) => {
  const mainWindow = getMainWindow();
  const view = views[id];
  if (!view) return;
  mainWindow.removeBrowserView(view);
};

const focusActive = () => {
  try {
    const view = getMainWindow().getBrowserView();
    if (!view) return;
    view.webContents.focus();
    // eslint-disable-next-line no-empty
  } catch (error) { }
};

const executeWebContentsMethod = ({ viewId, methodName, methodParams }) => {
  const view = views[viewId];
  if (!view) return;
  view.webContents[methodName](...methodParams);
};

const createView = ({ partition: _partition }) => {
  const preload = path.join(__static, 'webview.js');
  const partition = _partition ? `persist:${_partition}` : undefined;
  const view = new BrowserView({
    webPreferences: {
      partition,
      preload,
    },
  });

  view.setBackgroundColor('#fff');

  const viewId = nanoid();

  views[viewId] = view;

  let isLoadedCooldown = 0;

  const { webContents } = view;

  contextMenus[viewId] = contextMenu({
    window: webContents,
    showSelectAll: true,
    showCopyVideoAddress: true,
    showSaveVideo: true,
    showSaveVideoAs: true,
    showCopyImageAddress: true,
    showInspectElement: true,
    showSaveImageAs: true,
    showSaveLinkAs: true,
    showServices: true,
  });

  webContents.on('did-start-loading', () => {
    clearTimeout(isLoadedCooldown);
    const payload = { viewId, data: { isLoaded: false } };
    ipc.callRenderer(getMainWindow(), 'app-bv-is-loaded', payload);
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', payload);
  });

  webContents.on('did-stop-loading', () => {
    const statePayload = { viewId, data: { url: webContents.getURL() } };
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', statePayload);

    const isLoadedPayload = { viewId, data: { isLoaded: true } };
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', isLoadedPayload);

    isLoadedCooldown = setTimeout(() => {
      ipc.callRenderer(getMainWindow(), 'app-bv-is-loaded', isLoadedPayload);
    }, 2000);
  });

  webContents.on('dom-ready', () => {
    webContents.executeJavaScript(`
      (() => {
        const OriginalNotification = Notification;

        window.Notification = function (title, options) { window.pigment.transferNotification(title, options); }
        Notification.permission = OriginalNotification.permission;
        Notification.requestPermission = OriginalNotification.requestPermission;
      })();
    `);

    const scripts = customScripts[viewId];
    webContents.insertCSS(scripts ? scripts.css : '');
    webContents.executeJavaScript(scripts ? scripts.js : '');
  });

  webContents.on('page-title-updated', (_, title) => {
    const payload = { viewId, data: { title } };
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', payload);
  });

  webContents.on('page-favicon-updated', (_, favicons) => {
    const favicon = favicons.pop();
    const payload = { viewId, data: { favicon } };
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', payload);
  });

  webContents.setWindowOpenHandler((details) => {
    const { protocol } = url.parse(details.url);

    if (['http:', 'https:'].includes(protocol)) {
      shell.openExternal(details.url);
    }

    return { action: 'deny' };
  });

  webContents.on('ipc-message', (_, channel, ...args) => {
    if (channel !== 'notification') return;

    const [notification] = args;

    ipc.callRenderer(getMainWindow(), 'app-bv-new-notification', {
      viewId,
      data: { notification },
    });
  });

  const canGo = () => {
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', {
      viewId,
      data: {
        canGoBack: webContents.canGoBack(),
        canGoForward: webContents.canGoForward(),
      },
    });
  };

  webContents.on('did-navigate', canGo);
  webContents.on('did-navigate-in-page', canGo);
  webContents.on('did-frame-navigate', canGo);

  return viewId;
};

const initBrowserViews = () => {
  ipc.answerRenderer('app-bv-create', createView);
  ipc.answerRenderer('app-bv-update-bounds', updateBounds);
  ipc.answerRenderer('app-bv-destroy-all', destroyAll);
  ipc.answerRenderer('app-bv-destroy-by-id', destroyById);
  ipc.answerRenderer('app-bv-show-by-id', showById);
  ipc.answerRenderer('app-bv-hide-by-id', hideById);
  ipc.answerRenderer('app-bv-focus-active', focusActive);
  ipc.answerRenderer('app-bv-execute-webcontents-method', executeWebContentsMethod);
  ipc.answerRenderer('app-bv-set-custom-scripts', setCustomScripts);
};

export default initBrowserViews;
