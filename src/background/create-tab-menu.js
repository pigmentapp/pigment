import { clipboard, Menu } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';

const menu = Menu.buildFromTemplate([
  {
    label: 'Go to homepage',
    type: 'checkbox',
    id: 'go-to-home',
    click: () => ipc.callFocusedRenderer('app-tabs-active-go-to-home'),
  },
  {
    label: 'Set as homepage',
    type: 'checkbox',
    id: 'set-as-home',
    click: () => ipc.callFocusedRenderer('app-tabs-active-set-as-home'),
  },
  {
    label: 'Hard reload',
    accelerator: 'CmdOrCtrl+Shift+R',
    click: () => ipc.callFocusedRenderer('app-tabs-active-reload-hard'),
  },
  {
    label: 'Copy URL to clipboard',
    id: 'clipboard',
  },
  { type: 'separator' },
  {
    label: 'Edit',
    accelerator: 'CmdOrCtrl+E',
    click: () => ipc.callFocusedRenderer('app-tabs-active-edit'),
  },
  {
    label: 'Delete',
    accelerator: 'CmdOrCtrl+W',
    click: () => ipc.callFocusedRenderer('app-tabs-active-delete'),
  },
  { type: 'separator' },
  {
    label: 'Show devtools',
    accelerator: 'CmdOrCtrl+Shift+I',
    click: () => ipc.callFocusedRenderer('app-tabs-active-toggle-devtools'),
  },
]);

const createTabMenu = () => {
  ipc.answerRenderer('app-show-tab-menu', ({
    currentUrl, startUrl, x, y,
  }) => {
    menu.getMenuItemById('clipboard').click = () => clipboard.writeText(currentUrl);
    menu.getMenuItemById('go-to-home').checked = startUrl === currentUrl;
    menu.getMenuItemById('set-as-home').checked = startUrl === currentUrl;

    menu.popup({
      x,
      y,
      callback: () => {
        setTimeout(() => {
          ipc.callFocusedRenderer('app-tabs-active-menu-close');
        }, 10);
      },
    });
  });
};

export default createTabMenu;
