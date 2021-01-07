import path from 'path';
import { BrowserView, shell } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';
import url from 'url';
import { getMainWindow } from '@/background/create-main-window';

let bounds = {};
const views = [];
const customScripts = [];

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
  getMainWindow().removeBrowserView(view);
  view.destroy();
  delete views[id];
};

const destroyAll = () => {
  views.forEach((view) => destroyById(view.id));
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
  const view = mainWindow.getBrowserViews().find((v) => v.id === id);
  if (!view) return;
  mainWindow.removeBrowserView(view);
};

const executeWebContentsMethod = ({ viewId, methodName, methodParams }) => {
  const view = views[viewId];
  if (!view) return;
  view.webContents[methodName](...methodParams);
};

const createView = ({ partition: _partition }) => {
  const preload = path.join(__static, 'webview.js');
  const partition = _partition ? `persist:${_partition}` : undefined;
  const view = new BrowserView({ webPreferences: { preload, partition } });

  views[view.id] = view;

  let isLoadedCooldown = 0;

  const { webContents } = view;

  webContents.on('did-start-loading', () => {
    clearTimeout(isLoadedCooldown);
    const payload = { viewId: view.id, data: { isLoaded: false } };
    ipc.callRenderer(getMainWindow(), 'app-bv-is-loaded', payload);
  });

  webContents.on('did-stop-loading', () => {
    const statePayload = { viewId: view.id, data: { url: webContents.getURL() } };
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', statePayload);

    isLoadedCooldown = setTimeout(() => {
      const isLoadedPayload = { viewId: view.id, data: { isLoaded: true } };
      ipc.callRenderer(getMainWindow(), 'app-bv-is-loaded', isLoadedPayload);
    }, 2000);
  });

  webContents.on('dom-ready', () => {
    const scripts = customScripts[view.id];
    webContents.insertCSS(scripts ? scripts.css : '');
    webContents.executeJavaScript(scripts ? scripts.js : '');
  });

  webContents.on('page-title-updated', (_, title) => {
    const payload = { viewId: view.id, data: { title } };
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', payload);
  });

  webContents.on('page-favicon-updated', (_, favicons) => {
    const favicon = favicons.pop();
    const payload = { viewId: view.id, data: { favicon } };
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', payload);
  });

  webContents.on('new-window', (e, openUrl) => {
    const { protocol } = url.parse(openUrl);

    if (!['http:', 'https:'].includes(protocol)) return;
    shell.openExternal(openUrl);
  });

  webContents.on('ipc-message', (_, channel, ...args) => {
    if (channel !== 'notification') return;

    const [notification] = args;

    ipc.callRenderer(getMainWindow(), 'app-bv-new-notification', {
      viewId: view.id,
      data: { notification },
    });
  });

  const canGo = () => {
    ipc.callRenderer(getMainWindow(), 'app-bv-update-state', {
      viewId: view.id,
      data: {
        canGoBack: webContents.canGoBack(),
        canGoForward: webContents.canGoForward(),
      },
    });
  };

  webContents.on('did-navigate', canGo);
  webContents.on('did-navigate-in-page', canGo);
  webContents.on('did-frame-navigate', canGo);

  return view.id;
};

const initBrowserViews = () => {
  ipc.answerRenderer('app-bv-create', createView);
  ipc.answerRenderer('app-bv-update-bounds', updateBounds);
  ipc.answerRenderer('app-bv-destroy-all', destroyAll);
  ipc.answerRenderer('app-bv-destroy-by-id', destroyById);
  ipc.answerRenderer('app-bv-show-by-id', showById);
  ipc.answerRenderer('app-bv-hide-by-id', hideById);
  ipc.answerRenderer('app-bv-execute-webcontents-method', executeWebContentsMethod);
  ipc.answerRenderer('app-bv-set-custom-scripts', setCustomScripts);
};

export default initBrowserViews;
