import { WebContents } from 'electron';

export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: any
};

export type Settings = {
  'dimmer.dimDelayInMs': number,
  'dimmer.dimIfWindowIsNotInFocus': boolean,
  'dimmer.displayBadgeAtNewNotifications': boolean,
  'layout.sideBarLocation': 'left' | 'right',
  'navigation.displayTabLabels': boolean,
  'navigation.indicatorBadgeColor': 'blue' | 'gray' | 'orange' | 'red' | 'yellow',
  'navigation.indicatorBadgeSize': 'normal' | 'large' | 'hidden',
  'notifications.holdBackIfWindowIsNotInFocus': boolean,
  'notifications.sendSummaryIfWindowIsNotInFocus': boolean,
  'notifications.summaryIntervalInMs': number,
  'notifications.displayAppIconBadgeIfWindowIsNotInFocus': boolean,
  'window.muteAudioIfWindowIsNotInFocus': boolean,
};

export type TabSettings = Partial<Pick<Settings, 'dimmer.dimIfWindowIsNotInFocus' | 'window.muteAudioIfWindowIsNotInFocus' | 'notifications.holdBackIfWindowIsNotInFocus'>>;

export type Tab = {
  id: string;
  label: string;
  url: string;
  favicon: string;
  isSecondary: boolean;
  isLazy: boolean;
  userAgent: string;
  customCss: string;
  customJs: string;
  scope: string;
  settings: TabSettings;
};

export type TabCreate = Pick<Tab, 'label' | 'url'>;

export type TabProps = {
  id: string;
  isLast: boolean;
  isFirst: boolean;
};

export type TabNotification = {
  tabId: string;
  timestamp: number;
  notification: {
    title: string;
    options: NotificationOptions;
  };
};

export type PageState = {
  title: string;
  hasNotificationBadge: boolean;
  url: string;
  canGoBack: boolean;
  canGoForward: boolean;
  certificateError: boolean;
  favicon: string;
  tabId: string;
  isLoaded: boolean;
};

export type ViewId = string;

// eslint-disable-next-line @typescript-eslint/ban-types
export type WebContentsMethods = KeyOfType<WebContents, Function>;

export type ExecuteWebContentsMethod<K extends WebContentsMethods> = {
  viewId: ViewId;
  methodName: K;
  methodParams: Parameters<WebContents[K]>;
};

export type IpcBrowserViewUpdateState = {
  viewId: ViewId;
  data: Partial<PageState>;
};
