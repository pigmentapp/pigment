// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');
const isUrlRelativeUrl = require('is-url-relative-without-domain');

const OriginalNotification = Notification;

// eslint-disable-next-line func-names
window.Notification = function (title, options) {
  const notificationOptions = options;

  if (notificationOptions.icon && isUrlRelativeUrl(notificationOptions.icon)) {
    notificationOptions.icon = `${window.location.origin}/${notificationOptions.icon}`;
  }

  ipcRenderer.sendToHost('notification', { title, options: notificationOptions });
};

Notification.permission = OriginalNotification.permission;
Notification.requestPermission = OriginalNotification.requestPermission;
