<template>
  <app-form-element v-bind="$attrs">
    <prism-editor
      v-model="value"
      :class="$style.editor"
      :language="language"
    />
  </app-form-element>
</template>

<script>
import 'prismjs';
import PrismEditor from 'vue-prism-editor';

export default {
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
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="postcss" module>
.editor pre {
  @apply
    px-4 py-2 w-full overflow-auto
    text-gray-400 text-left font-mono leading-relaxed
    whitespace-pre break-normal
    bg-gray-900 border border-gray-700 rounded
  ;

  tab-size: 2;
  hyphens: none;
  word-spacing: normal;
}

.editor :global(::selection) {
  @apply bg-blue-700;
}

.editor :global(.token.comment),
.editor :global(.token.prolog),
.editor :global(.token.cdata) {
  @apply text-gray-600;
}

.editor :global(.token.delimiter),
.editor :global(.token.boolean),
.editor :global(.token.keyword),
.editor :global(.token.selector),
.editor :global(.token.important),
.editor :global(.token.atrule) {
  @apply text-yellow-700;
}

.editor :global(.token.operator),
.editor :global(.token.punctuation),
.editor :global(.token.attr-name) {
  @apply text-gray-500;
}

.editor :global(.token.tag),
.editor :global(.token.tag .punctuation),
.editor :global(.token.doctype),
.editor :global(.token.builtin) {
  @apply text-blue-400;
}

.editor :global(.token.entity),
.editor :global(.token.number),
.editor :global(.token.symbol) {
  @apply text-green-600;
}

.editor :global(.token.property),
.editor :global(.token.constant),
.editor :global(.token.variable) {
  @apply text-blue-400;
}

.editor :global(.token.string),
.editor :global(.token.char) {
  @apply text-yellow-700;
}

.editor :global(.token.attr-value),
.editor :global(.token.attr-value .punctuation) {
  @apply text-yellow-700;
}

.editor :global(.token.attr-value .punctuation:first-child) {
  @apply text-gray-500;
}

.editor :global(.token.url) {
  @apply text-yellow-700 underline;
}

.editor :global(.token.function) {
  @apply text-yellow-700;
}

.editor :global(.token.inserted) {
  @apply bg-green-700;
}

.editor :global(.token.deleted) {
  @apply bg-orange-800;
}

.editor :global(.token.regex) {
  @apply bg-blue-900 rounded;
}

.editor :global(.token.bold) {
  @apply font-medium;
}

.editor :global(.token.italic) {
  @apply italic;
}
</style>
