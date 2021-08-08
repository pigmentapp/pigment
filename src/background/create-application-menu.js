import { app, Menu } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';

const createApplicationMenu = () => {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
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
          { label: 'New tab', accelerator: 'CmdOrCtrl+N', click: () => app.emit('app-router-goto-tabs-create') },
          { label: 'Reload active tab', accelerator: 'CmdOrCtrl+R', click: () => { ipc.callFocusedRenderer('app-tabs-active-reload'); } },
          { label: 'Reload active tab (hard)', accelerator: 'CmdOrCtrl+Shift+R', click: () => { ipc.callFocusedRenderer('app-tabs-active-reload-hard'); } },
          { label: 'Edit active tab', accelerator: 'CmdOrCtrl+E', click: () => { ipc.callFocusedRenderer('app-tabs-active-edit'); } },
          { label: 'Delete active tab', accelerator: 'CmdOrCtrl+W', click: () => { ipc.callFocusedRenderer('app-tabs-active-delete'); } },
          { label: 'Toggle devtools of active tab', accelerator: 'CmdOrCtrl+Shift+I', click: () => { ipc.callFocusedRenderer('app-tabs-active-toggle-devtools'); } },
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
              { label: 'New tab', accelerator: 'CmdOrCtrl+T', click: () => app.emit('app-router-goto-tabs-create') },
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
    ]),
  );
};

export default createApplicationMenu;
