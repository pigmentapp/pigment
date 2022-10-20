import { Menu } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';
import { TabProps } from '@/types';

let tab: TabProps;

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
  ipc.answerRenderer('app-tabs-open-context-menu-by-id', (tabProps: TabProps) => {
    tab = tabProps;

    const sortNextItem = menu.getMenuItemById('sort-next');
    const sortLastItem = menu.getMenuItemById('sort-last');
    const sortPrevItem = menu.getMenuItemById('sort-prev');
    const sortFirstItem = menu.getMenuItemById('sort-first');

    if (tab.isLast) {
      if (sortNextItem) sortNextItem.enabled = false;
      if (sortLastItem) sortLastItem.enabled = false;
    }

    if (tab.isFirst) {
      if (sortPrevItem) sortPrevItem.enabled = false;
      if (sortFirstItem) sortFirstItem.enabled = false;
    }

    menu.popup({
      callback() {
        if (sortNextItem) sortNextItem.enabled = true;
        if (sortLastItem) sortLastItem.enabled = true;
        if (sortPrevItem) sortPrevItem.enabled = true;
        if (sortFirstItem) sortFirstItem.enabled = true;
      },
    });
  });
};

export default createTabContextMenu;
