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
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  components: {
    TitleBar,
    TitleBarText,
  },
  data() {
    return {
      tab: {},
    };
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

.tabContent {
  @apply my-4;
}
</style>
