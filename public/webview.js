// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer, remote } = require('electron');
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

function whatsAppHack() {
  // https://github.com/meetfranz/franz/issues/1185#issuecomment-447908579
  const ses = remote.session.defaultSession; // Gets the default session
  ses.flushStorageData(); // Writes any unwritten DOMStorage data to disk
  ses.clearStorageData({ // Clears the specified storages in the session
    storages: ['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb'],
  });
  window.navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister(); // Unregisters all the service workers
    });
  });
  const titleEl = document.querySelector('.window-title');
  if (titleEl && titleEl.innerHTML.includes('Google Chrome 36+')) {
    window.location.reload(); // Reloads the page if the page shows the error
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.location.host === 'web.whatsapp.com') {
    whatsAppHack();
  }
});
