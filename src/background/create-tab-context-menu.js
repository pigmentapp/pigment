import { Menu } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';

let tab = null;

const menu = Menu.buildFromTemplate([
  {
    label: 'Reload',
    click: () => { ipc.callFocusedRenderer('app-tabs-reload-by-id', tab.id); },
  },
  {
    label: 'Hard reload',
    click: () => { ipc.callFocusedRenderer('app-tabs-reload-hard-by-id', tab.id); },
  },
  { type: 'separator' },
  {
    id: 'sort-prev',
    label: 'Move one up',
    click: () => { ipc.callFocusedRenderer('app-tabs-sort-prev-by-id', tab.id); },
  },
  {
    id: 'sort-next',
    label: 'Move one down',
    click: () => { ipc.callFocusedRenderer('app-tabs-sort-next-by-id', tab.id); },
  },
  { type: 'separator' },
  {
    id: 'sort-first',
    label: 'Move to top',
    click: () => { ipc.callFocusedRenderer('app-tabs-sort-first-by-id', tab.id); },
  },
  {
    id: 'sort-last',
    label: 'Move to bottom',
    click: () => { ipc.callFocusedRenderer('app-tabs-sort-last-by-id', tab.id); },
  },
  { type: 'separator' },
  {
    label: 'Edit',
    click: () => { ipc.callFocusedRenderer('app-tabs-edit-by-id', tab.id); },
  },
  {
    label: 'Delete',
    click: () => { ipc.callFocusedRenderer('app-tabs-delete-by-id', tab.id); },
  },
  { type: 'separator' },
  {
    label: 'Show devtools',
    click: () => { ipc.callFocusedRenderer('app-tabs-toggle-devtools-by-id', tab.id); },
  },
]);

const createTabContextMenu = () => {
  ipc.answerRenderer('app-tabs-open-context-menu-by-id', (tabProps) => {
    tab = tabProps;

    if (tab.isLast) {
      menu.getMenuItemById('sort-next').enabled = false;
      menu.getMenuItemById('sort-last').enabled = false;
    }

    if (tab.isFirst) {
      menu.getMenuItemById('sort-prev').enabled = false;
      menu.getMenuItemById('sort-first').enabled = false;
    }

    menu.popup({
      callback() {
        tab = null;
        menu.getMenuItemById('sort-next').enabled = true;
        menu.getMenuItemById('sort-last').enabled = true;
        menu.getMenuItemById('sort-prev').enabled = true;
        menu.getMenuItemById('sort-first').enabled = true;
      },
    });
  });
};

export default createTabContextMenu;
