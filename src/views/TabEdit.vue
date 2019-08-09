<template>
  <app-content>
    <title-bar :back-button="true">
      <title-bar-text>
        Edit {{ tab.label }}
      </title-bar-text>
    </title-bar>

    <form @submit.prevent="updateTab">
      <app-tabs>
        <div
          slot="General"
          :class="$style.tabContent"
        >
          <app-form-input
            v-model="tab.label"
            label="Name"
            placeholder="Insert tab title"
            required
          />

          <app-form-input
            v-model="tab.url"
            label="URL"
            placeholder="Insert tab title"
            type="url"
            required
          />
        </div>

        <div
          slot="Advanced"
          :class="$style.tabContent"
        >
          <app-form-input
            v-model="tab.scope"
            :datalist="scopes"
            :disabled="useTabIdAsScope"
            label="Session scope"
          >
            <app-form-checkbox v-model="useTabIdAsScope">
              Use a tab unique scope
            </app-form-checkbox>
          </app-form-input>

          <app-form-text-editor
            v-model="tab.userAgent"
            label="User Agent"
          />

          <app-form-text-editor
            v-model="tab.customCss"
            label="Style Sheets"
            language="css"
          />

          <app-form-text-editor
            v-model="tab.customJs"
            label="JavaScript"
            language="js"
          />
        </div>

        <div
          slot="Settings"
          :class="$style.tabContent"
        >
          <settings-item>
            <template slot="label">
              Dimmer
            </template>
            <template slot="descr">
              Fade out tab contents if you work outside the app.
            </template>
            <template slot="control">
              <select
                v-model="tab.settings['dimmer.dimIfWindowIsNotInFocus']"
                :class="$style.select"
              >
                <option :value="undefined">Inherit</option>
                <option :value="true">Dim</option>
                <option :value="false">Don't dim</option>
              </select>
            </template>
          </settings-item>

          <settings-item>
            <template slot="label">
              Audio
            </template>
            <template slot="descr">
              Mute tab audio if you work outside the app.
            </template>
            <template slot="control">
              <select
                v-model="tab.settings['window.muteAudioIfWindowIsNotInFocus']"
                :class="$style.select"
              >
                <option :value="undefined">Inherit</option>
                <option :value="true">Mute</option>
                <option :value="false">Don't mute</option>
              </select>
            </template>
          </settings-item>

          <settings-item>
            <template slot="label">
              Notifications
            </template>
            <template slot="descr">
              Hold back tab notifications if you work outside the app.
            </template>
            <template slot="control">
              <select
                v-model="tab.settings['notifications.holdBackIfWindowIsNotInFocus']"
                :class="$style.select"
              >
                <option :value="undefined">Inherit</option>
                <option :value="true">Hold back</option>
                <option :value="false">Don't hold back</option>
              </select>
            </template>
          </settings-item>
        </div>
      </app-tabs>

      <div :class="$style.actions">
        <app-button
          :class="$style.button"
          primary
          type="submit"
        >
          Save
        </app-button>
        <app-button
          :class="$style.button"
          secondary
          @click="deleteTab"
        >
          Delete Tab
        </app-button>
      </div>
    </form>
  </app-content>
</template>

<script>
import SettingsItem from '@/components/SettingsItem.vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  components: {
    SettingsItem,
    TitleBar,
    TitleBarText,
  },
  data() {
    return {
      tab: {},
    };
  },
  computed: {
    scopes() {
      return this.$store.getters['Tabs/scopes'];
    },
    useTabIdAsScope: {
      get() {
        return this.tab.id === this.tab.scope;
      },
      set(value) {
        this.tab.scope = value ? this.tab.id : '';
      },
    },
  },
  created() {
    const { id } = this.$route.params;
    this.tab = { ...this.$store.getters['Tabs/byId'](id) };
  },
  methods: {
    updateTab() {
      const { id, ...data } = this.tab;
      this.$store.commit('Tabs/update', { id, data });

      this.$router.push({
        name: 'tabs',
        params: { id: this.tab.id },
      });
    },
    deleteTab() {
      this.$store.commit('Tabs/delete', this.tab);
      this.$router.push({ name: 'welcome' });
    },
  },
};
</script>

<style lang="postcss" module>
.button {
  @apply flex-1 mx-2;
}

.actions {
  @apply flex flex-row-reverse pt-3 -mx-2;
}

.select {
  @apply
    block px-4 py-2 w-48
    leading-tight appearance-none bg-gray-700
    border border-gray-600 rounded;
}

.tabContent {
  @apply my-4;
}
</style>
