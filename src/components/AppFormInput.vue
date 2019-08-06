<template>
  <app-form-element v-bind="$attrs">
    <input
      v-model="value"
      :class="$style.input"
      :type="$attrs.type"
      :placeholder="$attrs.placeholder"
      :required="$attrs.required"
    >
  </app-form-element>
</template>

<script>
export default {
  inheritAttrs: false,
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
.input {
  @apply
    px-4 py-2 w-full
    text-gray-400 leading-relaxed
    bg-gray-900 border border-gray-700 rounded;
}
</style>
