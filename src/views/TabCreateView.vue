<template>
  <app-content>
    <title-bar back-button>
      <title-bar-text>
        Create new tab
      </title-bar-text>
    </title-bar>

    <app-tabs>
      <form
        slot="Custom"
        :class="$style.tabContent"
        @submit.prevent="createTab"
      >
        <app-form-input
          v-model="tab.label"
          required
          label="Name"
          descr="The tab label displayed in the sidebar."
        />

        <app-form-input
          v-model="tab.url"
          type="url"
          required
          label="URL"
          descr="Homepage of the tab. For example: https://google.com"
        />

        <div :class="$style.actions">
          <app-button
            primary
            type="submit"
          >
            Create
          </app-button>
        </div>
      </form>
      <suggested-apps
        slot="By Template"
        :class="$style.tabContent"
        go-to-created-tab
      />
    </app-tabs>
  </app-content>
</template>

<script lang="ts">
import Vue from 'vue';
import SuggestedApps from '@/components/SuggestedApps.vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';
import { TabCreate } from '@/types';

export default Vue.extend({
  components: {
    SuggestedApps,
    TitleBar,
    TitleBarText,
  },
  data() {
    const tab: TabCreate = {
      label: '',
      url: 'https://',
    };
    return { tab };
  },
  methods: {
    async createTab() {
      const tab = await this.$store.dispatch('Tabs/create', this.tab);

      this.$router.push({
        name: 'tabs',
        params: {
          id: tab.id,
        },
      });
    },
  },
});
</script>

<style lang="postcss" module>
.actions {
  @apply pt-6;
}

.tabContent {
  @apply mt-4;
}
</style>
