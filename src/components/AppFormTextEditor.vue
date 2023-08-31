<template>
  <app-form-element v-bind="$attrs">
    <prism-editor
      v-model="value"
      :class="$style.editor"
      :language="language"
      :highlight="highlighter"
    />
  </app-form-element>
</template>

<script lang="ts">
import Vue from 'vue';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { languages } from 'prismjs';
import { highlight } from 'prismjs/components/prism-core';
import 'prismjs/themes/prism-tomorrow.css';

export default Vue.extend({
  components: {
    PrismEditor,
  },
  inheritAttrs: false,
  props: {
    language: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    value: {
      get(): string {
        return this.$attrs.value;
      },
      set(value: string) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    highlighter(code: string) {
      return highlight(code, languages[this.language]);
    },
  },
});
</script>

<style lang="postcss" module>
.editor {
  @apply
    px-4 py-2 w-full overflow-auto
    text-gray-400 text-left font-mono leading-relaxed
    whitespace-pre break-normal
    bg-gray-900 border border-gray-700 rounded
  ;
}

.editor :global(.prism-editor__textarea:focus) {
  outline: none;
}
</style>
