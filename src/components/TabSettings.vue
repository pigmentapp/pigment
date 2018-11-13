<template>
  <form
    class="flex flex-grow items-center justify-center"
    @submit.prevent="saveSettings"
  >
    <div>
      <label class="block mb-4">
        <div class="mb-1">Label</div>
        <input
          v-model="tab.label"
          class="input"
          type="text"
          placeholder="Insert tab title"
        >
      </label>
      <label class="block mb-4">
        <div class="mb-1">URL</div>
        <input
          v-model="tab.url"
          class="input"
          type="url"
        >
      </label>
      <template v-if="!item.isNew">
        <label
          class="block mb-4"
        >
          <div class="mb-1">User Agent</div>
          <textarea
            v-model="tab.userAgent"
            class="input"
          />
        </label>
        <label
          class="block mb-4"
        >
          <div class="mb-1">Custom CSS</div>
          <prism-editor
            v-model="tab.customCss"
            language="css"
          />
        </label>
        <label
          class="block mb-4"
        >
          <div class="mb-1">Custom JavaScript</div>
          <prism-editor
            v-model="tab.customJs"
            language="js"
          />
        </label>
      </template>
      <div class="flex flex-row-reverse -mx-2">
        <app-button
          class="flex-1 mx-2"
          type="submit"
        >Save</app-button>
        <app-button
          class="flex-1 mx-2"
          schema="grey-darker"
          @click="deleteTab"
        >Delete Tab</app-button>
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
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      editors: {
        css: null,
        js: null,
      },
      tab: {},
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(value) {
        this.tab = { ...value };

        if (!this.tab.url) {
          this.tab.url = 'https://';
        }

        if (!this.tab.customCss) {
          this.tab.customCss = '/* Add custom CSS styles */';
        }

        if (!this.tab.customJs) {
          this.tab.customJs = '/* Add custom JavaScript */';
        }
      },
    },
  },
  methods: {
    saveSettings() {
      if (!this.tab.url) return;

      this.$store.commit('Tabs/update', {
        ident: this.item.ident,
        data: {
          ...this.tab,
        },
      });

      this.$emit('submitted', {
        isNewTab: this.tab.isNew,
      });
    },
    deleteTab() {
      this.$store.commit('Tabs/delete', this.item);
    },
  },
};
</script>

<style lang="postcss" scoped>
label {
  min-width: 33vw;
}
.input {
  @apply px-2 py-1 w-full;
  @apply text-grey-light leading-tight;
  @apply bg-transparent border border-grey-darker rounded-sm;
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
