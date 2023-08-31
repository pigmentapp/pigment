<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label :class="$style.wrap">
    <input
      v-model="internalValue"
      :class="$style.input"
      type="checkbox"
    >
    <app-icon
      :size="8"
      :class="{
        [$style.active]: internalValue && !disabled,
      }"
      :face="internalValue ? 'ToggleSwitch' : 'ToggleSwitchOff'"
    />
    <div
      v-if="$slots.default"
      :class="$style.label"
    >
      <slot />
    </div>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    internalValue: {
      get(): boolean {
        return this.value;
      },
      set(value: boolean) {
        this.$emit('input', value);
      },
    },
  },
});
</script>

<style lang="postcss" module>
.wrap {
  @apply inline-flex items-center cursor-pointer;
}

.input {
  @apply sr-only;
}

.label {
  @apply ml-2;
}

.active {
  @apply text-green-500;
}
</style>
