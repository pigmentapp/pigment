// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

const OriginalNotification = Notification;

// eslint-disable-next-line func-names
window.Notification = function (title, options) {
  ipcRenderer.sendToHost('notification', { title, options });
};

Notification.permission = OriginalNotification.permission;
Notification.requestPermission = OriginalNotification.requestPermission;
