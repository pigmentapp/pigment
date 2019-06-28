<template>
  <app-content>
    <title-bar :back-button="true">
      <title-bar-text>
        Settings
      </title-bar-text>
    </title-bar>

    <app-content-section>
      <app-heading>
        Navigation
        <template slot="sub">Customize the navigation as you like it</template>
      </app-heading>

      <settings-item-toggle setting="navigation.displayTabLabels">
        <template slot="label">Navigation labels</template>
        <template slot="descr">
          Do you know your tabs? Disable labels to get more work space.
        </template>
      </settings-item-toggle>

      <settings-item-toggle setting="navigation.displayHomeButton">
        <template slot="label">Home button</template>
        <template slot="descr">
          Save more space. The welcome page is available via the
          <app-icon
            face="settings"
            inline
          />-button
          too.
        </template>
      </settings-item-toggle>

      <settings-item-select
        :options="[
          { value: 'left', label: 'Left'},
          { value: 'right', label: 'Right'},
        ]"
        setting="layout.sideBarLocation"
      >
        <template slot="label">Sidebar location</template>
        <template slot="descr">
          Sometimes it just fits better on the other side.
        </template>
      </settings-item-select>

      <settings-item-select
        :options="[
          { value: 'blue', label: 'Blue'},
          { value: 'gray', label: 'Gray'},
          { value: 'orange', label: 'Orange'},
          { value: 'red', label: 'Red'},
          { value: 'yellow', label: 'Yellow'},
        ]"
        setting="navigation.indicatorBadgeColor"
      >
        <template slot="label">Indicator badge color</template>
        <template slot="descr">
          Color of the notification indicator on the tab item.
        </template>
      </settings-item-select>

      <settings-item-select
        :options="[
          { value: 'normal', label: 'Normal'},
          { value: 'large', label: 'Large'},
          { value: 'hidden', label: 'Hidden'},
        ]"
        setting="navigation.indicatorBadgeSize"
      >
        <template slot="label">Indicator badge size</template>
        <template slot="descr">
          Size of the notification indicator on the tab item.
        </template>
      </settings-item-select>
    </app-content-section>

    <app-content-section>
      <app-heading>
        Dimmer
        <template slot="sub">
          Overlays all contents if the app loses focus
        </template>
      </app-heading>

      <settings-item-toggle setting="dimmer.dimIfWindowIsNotInFocus">
        <template slot="label">Dim contents</template>
        <template slot="descr">
          Will fade out all contents if you work outside the app.
          It helps you to stay focused, can help to reduce stress
          and saves you from unwanted glances.
        </template>
      </settings-item-toggle>

      <settings-item-input
        :get-modifier="(value) => value / 1000"
        :set-modifier="(value) => Math.max(0, value) * 1000"
        :disabled-if-not-setting="['dimmer.dimIfWindowIsNotInFocus']"
        type="number"
        setting="dimmer.dimDelayInMs"
      >
        <template slot="label">Dimmer delay</template>
        <template slot="descr">
          Set a delay before the dimmer starts (in seconds).
        </template>
      </settings-item-input>

      <settings-item-toggle
        :disabled-if-not-setting="['dimmer.dimIfWindowIsNotInFocus']"
        setting="dimmer.displayBadgeAtNewNotifications"
      >
        <template slot="label">Notification indicator</template>
        <template slot="descr">
          Displays a subtle circle around the {{ $productInfo.productName }}
          logo inside the dimmer when you receive notifications
          while working outside the app.
        </template>
      </settings-item-toggle>
    </app-content-section>

    <app-content-section>
      <app-heading>
        Audio
        <template slot="sub">General audio settings</template>
      </app-heading>

      <settings-item-toggle setting="window.muteAudioIfWindowIsNotInFocus">
        <template slot="label">Mute tabs if the app loses focus</template>
        <template slot="descr">
          Will mute all audio if you work outside the app.
          That way you won't get distracted by notification sounds.
        </template>
      </settings-item-toggle>
    </app-content-section>

    <app-content-section>
      <app-heading>
        Notifications
        <template slot="sub">Schedule notifications to stay focused</template>
      </app-heading>

      <settings-item-toggle setting="notifications.holdBackIfWindowIsNotInFocus">
        <template slot="label">Hold back notifications</template>
        <template slot="descr">
          Will prevent all incoming notifications if you work outside the app.
        </template>
      </settings-item-toggle>

      <settings-item-toggle
        :disabled-if-not-setting="['notifications.holdBackIfWindowIsNotInFocus']"
        setting="notifications.sendSummaryIfWindowIsNotInFocus"
      >
        <template slot="label">Send summary of new notifications</template>
        <template slot="descr">
          Get a summary of all prevented notifications
          based on a self-defined schedule.
        </template>
      </settings-item-toggle>

      <settings-item-input
        :get-modifier="(value) => value / 60 / 1000"
        :set-modifier="(value) => Math.max(0.15, value) * 60 * 1000"
        :disabled-if-not-setting="[
          'notifications.holdBackIfWindowIsNotInFocus',
          'notifications.sendSummaryIfWindowIsNotInFocus',
        ]"
        type="number"
        setting="notifications.summaryIntervalInMs"
      >
        <template slot="label">Schedule of the summary</template>
        <template slot="descr">
          As soon as you work outside the app,
          you will be notified of withheld notifications
          after the specified interval (in minutes).
        </template>
      </settings-item-input>

      <settings-item-toggle
        v-if="$options.isMac"
        setting="notifications.displayAppIconBadgeIfWindowIsNotInFocus"
      >
        <template slot="label">Notification badge in dock</template>
        <template slot="descr">
          Shows a badge on the {{ $productInfo.productName }} icon
          when you receive notifications while working outside the app.
        </template>
      </settings-item-toggle>

      <settings-item-toggle
        v-else-if="$options.isWin"
        setting="notifications.displayAppIconBadgeIfWindowIsNotInFocus"
      >
        <template slot="label">Highlight app icon in taskbar</template>
        <template slot="descr">
          Highlights the {{ $productInfo.productName }} icon
          when you receive notifications while working outside the app.
        </template>
      </settings-item-toggle>
    </app-content-section>

    <app-content-section>
      <app-heading>
        Reset
        <template slot="sub">
          Danger zone: Deleted things will be gone forever
        </template>
      </app-heading>

      <settings-item-button
        secondary
        @click="wipeAppData"
      >
        <template slot="label">Cache</template>
        <template slot="descr">
          Will reset all app and tab caches.
        </template>
        <template slot="control">Clear</template>
      </settings-item-button>
    </app-content-section>

    <div :class="$style.copyright">
      {{ $productInfo.productName }} is made by
      <a
        :class="$style.link"
        href="//leonardhertel.de"
        @click.prevent="$electron.remote.shell.openExternal('https://leonardhertel.de')"
      >
        Leonard Hertel
      </a>
    </div>
  </app-content>
</template>

<script>
import SettingsItemButton from '@/components/SettingsItemButton.vue';
import SettingsItemSelect from '@/components/SettingsItemSelect.vue';
import SettingsItemInput from '@/components/SettingsItemInput.vue';
import SettingsItemToggle from '@/components/SettingsItemToggle.vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  isMac: process.platform === 'darwin',
  isWin: process.platform === 'win32',
  components: {
    SettingsItemButton,
    SettingsItemSelect,
    SettingsItemInput,
    SettingsItemToggle,
    TitleBar,
    TitleBarText,
  },
  methods: {
    wipeAppData() {
      if (window.confirm('Are you sure you want to to that?')) { // eslint-disable-line no-alert
        this.$electron.remote.session.defaultSession.clearCache(() => {
          this.$electron.remote.session.defaultSession.clearStorageData({
            storages: ['localstorage', 'caches', 'indexdb'],
          }, () => {
            this.$router.replace('/');
            this.$electron.remote.getCurrentWindow().reload();
          });
        });
      }
    },
  },
};
</script>

<style lang="postcss" module>
.copyright {
  @apply pt-4 text-sm text-gray-600;
}

.link {
  @apply text-gray-600;
}
</style>
