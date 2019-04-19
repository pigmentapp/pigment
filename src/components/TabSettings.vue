<template>
  <form
    :class="$style.wrap"
    @submit.prevent="saveSettings"
  >
    <div>
      <label :class="$style.item">
        <div :class="$style.label">Label</div>
        <input
          v-model="tab.label"
          :class="$style.input"
          type="text"
          placeholder="Insert tab title"
        >
      </label>
      <label :class="$style.item">
        <div :class="$style.label">URL</div>
        <input
          v-model="tab.url"
          :class="$style.input"
          type="url"
        >
      </label>
      <template v-if="!item.isNew">
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
        >Save</app-button>
        <app-button
          :class="$style.button"
          schema="secondary"
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
