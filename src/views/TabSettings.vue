<template>
  <form
    :class="$style.wrap"
    @submit.prevent="submitForm"
  >
    <div>
      <label :class="$style.item">
        <div :class="$style.label">Label</div>
        <input
          v-model="tab.label"
          :class="$style.input"
          type="text"
          placeholder="Insert tab title"
          required
        >
      </label>
      <label :class="$style.item">
        <div :class="$style.label">URL</div>
        <input
          v-model="tab.url"
          :class="$style.input"
          type="url"
          required
        >
      </label>
      <template v-if="!isCreateMode">
        <label :class="$style.item">
          <div :class="$style.label">User Agent</div>
          <textarea
            v-model="tab.userAgent"
            :class="$style.input"
          />
        </label>
        <label :class="$style.item">
          <div :class="$style.label">Custom CSS</div>
          <prism-editor
            v-model="tab.customCss"
            language="css"
          />
        </label>
        <label :class="$style.item">
          <div :class="$style.label">Custom JavaScript</div>
          <prism-editor
            v-model="tab.customJs"
            language="js"
          />
        </label>
      </template>
      <div :class="$style.actions">
        <app-button
          :class="$style.button"
          type="submit"
        >
          {{ isCreateMode ? 'Create' : 'Save' }}
        </app-button>
        <app-button
          v-if="!isCreateMode"
          :class="$style.button"
          schema="secondary"
          @click="deleteTab"
        >
          Delete Tab
        </app-button>
      </div>
    </div>
  </form>
</template>

<script>
import 'prismjs';
import 'prism-themes/themes/prism-darcula.css';
import PrismEditor from 'vue-prism-editor';

export default {
  components: {
    PrismEditor,
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
    this.tab = this.$store.getters['Tabs/byId'](id);
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
.wrap {
  @apply flex flex-grow items-center justify-center;
}

.item {
  @apply block mb-4;
}

.label {
  @apply mb-1;
  min-width: 33vw;
}

.input {
  @apply px-2 py-1 w-full;
  @apply text-grey-light leading-tight;
  @apply bg-transparent border border-grey-darker rounded-sm;
}

.button {
  @apply flex-1 mx-2;
}

.actions {
  @apply flex flex-row-reverse -mx-2;
}

.prism-editor-wrapper {
  @apply overflow-hidden rounded-sm;
}

</style>

<style lang="postcss">
:not(pre) > code[class*="language-"], pre[class*="language-"] {
  @apply py-1 px-2 m-0 bg-black;
}
</style>
