<template>
  <app-form-element v-bind="$attrs">
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input
      v-model="value"
      :class="$style.input"
      :disabled="$attrs.disabled"
      :type="$attrs.type"
      :placeholder="$attrs.placeholder"
      :required="$attrs.required"
      :list="datalist && `inputList_${_uid}`"
    >
    <datalist
      v-if="datalist"
      :id="`inputList_${_uid}`"
    >
      <option
        v-for="option in datalist"
        :key="option"
        :value="option"
      />
    </datalist>
    <slot />
  </app-form-element>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    datalist: {
      type: Array,
      default: undefined,
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
.input {
  @apply
    px-4 py-2 w-full
    text-gray-400 leading-relaxed
    bg-gray-900 border border-gray-700 rounded;
}

.input[disabled] {
  @apply pointer-events-none text-gray-600 bg-gray-800;
}
</style>
