import { Menu } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';

let tabId = null;

const menu = Menu.buildFromTemplate([
  {
    label: 'Reload',
    click: () => { ipc.callFocusedRenderer('app-tabs-reload-by-id', tabId); },
  },
  {
    label: 'Hard reload',
    click: () => { ipc.callFocusedRenderer('app-tabs-reload-hard-by-id', tabId); },
  },
  { type: 'separator' },
  {
    label: 'Edit',
    click: () => { ipc.callFocusedRenderer('app-tabs-edit-by-id', tabId); },
  },
  {
    label: 'Delete',
    click: () => { ipc.callFocusedRenderer('app-tabs-delete-by-id', tabId); },
  },
  { type: 'separator' },
  {
    label: 'Show devtools',
    click: () => { ipc.callFocusedRenderer('app-tabs-toggle-devtools-by-id', tabId); },
  },
]);

const createTabContextMenu = () => {
  ipc.answerRenderer('app-tabs-open-context-menu-by-id', (id) => {
    tabId = id;

    menu.popup({
      callback() {
        tabId = null;
      },
    });
  });
};

export default createTabContextMenu;
