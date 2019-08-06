<template>
  <app-content>
    <title-bar :back-button="true">
      <title-bar-text>
        {{ isCreateMode ? 'Create new tab' : `Edit ${tab.label}` }}
      </title-bar-text>
    </title-bar>

    <form @submit.prevent="submitForm">
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

      <template v-if="!isCreateMode">
        <app-form-text-editor
          v-model="tab.userAgent"
          label="Custom User Agent"
        />

        <app-form-text-editor
          v-model="tab.customCss"
          label="Custom CSS"
          language="css"
        />

        <app-form-text-editor
          v-model="tab.customJs"
          label="Custom JavaScript"
          language="js"
        />
      </template>

      <app-form-element :class="$style.actions">
        <app-button
          :class="$style.button"
          primary
          type="submit"
        >
          {{ isCreateMode ? 'Create' : 'Save' }}
        </app-button>
        <app-button
          v-if="!isCreateMode"
          :class="$style.button"
          secondary
          @click="deleteTab"
        >
          Delete Tab
        </app-button>
      </app-form-element>
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
      tab: {
        label: '',
        url: 'https://',
        customCss: '/* Add custom CSS styles */',
        customJs: '/* Add custom JavaScript */',
        userAgent: '',
      },
    };
  },
  computed: {
    isCreateMode() {
      return this.$route.name === 'tabs-create';
    },
  },
  created() {
    if (this.isCreateMode) return;

    const { id } = this.$route.params;
    this.tab = { ...this.$store.getters['Tabs/byId'](id) };
  },
  methods: {
    submitForm() {
      if (this.isCreateMode) {
        this.createTab();
      } else {
        this.updateTab();
      }
    },
    async createTab() {
      const tab = await this.$store.dispatch('Tabs/create', this.tab);

      this.$router.push({
        name: 'tabs',
        params: {
          id: tab.id,
        },
      });
    },
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
  @apply flex flex-row-reverse -mx-2;
}
</style>
