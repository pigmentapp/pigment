<template>
  <app-content>
    <title-bar :back-button="true">
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

<script>
import SuggestedApps from '@/components/SuggestedApps.vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  components: {
    SuggestedApps,
    TitleBar,
    TitleBarText,
  },
  data() {
    return {
      tab: {
        label: '',
        url: 'https://',
      },
    };
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
};
</script>

<style lang="postcss" module>
.actions {
  @apply pt-6;
}

.tabContent {
  @apply mt-4;
}
</style>
