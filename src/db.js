import { homedir } from 'os';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync(`${homedir()}/.pigment.json`);
const db = lowdb(adapter);

db.defaults({
  notifications: [],
}).write();

// export const createNotification = ({ notification, tabIdent }) => {
//   const notificationItem = {
//     notification,
//     tabIdent,
//     timestamp: Date.now(),
//   };

//   db.get('notifications')
//     .push(notificationItem)
//     .write();

//   return notificationItem;
// };

// export const getNotifications = ({ afterTimestamp } = {}) => {
//   const notifications = db
//     .get('notifications')
//     .orderBy('timestamp', 'desc');

//   if (afterTimestamp) {
//     return notifications
//       .filter(item => item.timestamp > afterTimestamp)
//       .value();
//   }

//   return notifications.value();
// };

export default db;
