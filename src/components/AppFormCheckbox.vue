<template>
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

<script>
export default {
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
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
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
