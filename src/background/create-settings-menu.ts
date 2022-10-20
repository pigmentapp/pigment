import { Menu } from 'electron';
import { ipcMain as ipc } from 'electron-better-ipc';
import { autoUpdater } from 'electron-updater';
import { productName } from '@/../package.json';

const menu = Menu.buildFromTemplate([
  {
    label: 'Show navigation labels',
    type: 'checkbox',
    id: 'navigation.displayTabLabels',
    click: () => ipc.callFocusedRenderer('app-settings-toggle', 'navigation.displayTabLabels'),
  },
  {
    label: `Dim contents when ${productName} is out of focus`,
    type: 'checkbox',
    id: 'dimmer.dimIfWindowIsNotInFocus',
    click: () => ipc.callFocusedRenderer('app-settings-toggle', 'dimmer.dimIfWindowIsNotInFocus'),
  },
  {
    label: `Mute audio when ${productName} is out of focus`,
    type: 'checkbox',
    id: 'window.muteAudioIfWindowIsNotInFocus',
    click: () => ipc.callFocusedRenderer('app-settings-toggle', 'window.muteAudioIfWindowIsNotInFocus'),
  },
  {
    label: `Hold back notifications when ${productName} is out of focus`,
    type: 'checkbox',
    id: 'notifications.holdBackIfWindowIsNotInFocus',
    click: () => ipc.callFocusedRenderer('app-settings-toggle', 'notifications.holdBackIfWindowIsNotInFocus'),
  },
  { type: 'separator' },
  {
    label: 'More settings…',
    click: () => ipc.callFocusedRenderer('app-router-push', { name: 'settings' }),
  },
  { type: 'separator' },
  {
    label: 'Check for updates…',
    click: () => autoUpdater.checkForUpdates(),
  },
  { role: 'toggleDevTools' },
]);

const createSettingsMenu = () => {
  ipc.answerRenderer('app-show-settings-menu', ({ checked }) => {
    const navigationDisplayTabLabelsItem = menu.getMenuItemById('navigation.displayTabLabels');
    if (navigationDisplayTabLabelsItem) navigationDisplayTabLabelsItem.checked = checked.includes('navigation.displayTabLabels');

    const dimmerDimIfWindowIsNotInFocusItem = menu.getMenuItemById('dimmer.dimIfWindowIsNotInFocus');
    if (dimmerDimIfWindowIsNotInFocusItem) dimmerDimIfWindowIsNotInFocusItem.checked = checked.includes('dimmer.dimIfWindowIsNotInFocus');

    const windowMuteAudioIfWindowIsNotInFocusItem = menu.getMenuItemById('window.muteAudioIfWindowIsNotInFocus');
    if (windowMuteAudioIfWindowIsNotInFocusItem) windowMuteAudioIfWindowIsNotInFocusItem.checked = checked.includes('window.muteAudioIfWindowIsNotInFocus');

    const notificationsHoldBackIfWindowIsNotInFocus = menu.getMenuItemById('notifications.holdBackIfWindowIsNotInFocus');
    if (notificationsHoldBackIfWindowIsNotInFocus) notificationsHoldBackIfWindowIsNotInFocus.checked = checked.includes('notifications.holdBackIfWindowIsNotInFocus');

    menu.popup();
  });
};

export default createSettingsMenu;
