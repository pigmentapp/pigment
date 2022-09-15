const { ipcRenderer } = require('electron');

const { baseURI } = document;
// eslint-disable-next-line max-len
const isUrlRelativeUrl = (urlToTest) => new URL(baseURI).origin === new URL(urlToTest, baseURI).origin;

(function overrideNotifications() {
  const OriginalNotification = Notification;

  window.Notification = function Notification(title, options) {
    const notificationOptions = options;

    if (notificationOptions.icon && isUrlRelativeUrl(notificationOptions.icon)) {
      notificationOptions.icon = `${window.location.origin}/${notificationOptions.icon}`;
    }

    ipcRenderer.send('notification', { title, options: notificationOptions });
  };

  Notification.permission = OriginalNotification.permission;
  Notification.requestPermission = OriginalNotification.requestPermission;
}());
