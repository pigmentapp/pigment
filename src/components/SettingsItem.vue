<template>
  <div
    :class="{
      [$style.wrap]: true,
      [$style.disabled]: disabled,
    }"
  >
    <div :class="$style.body">
      <div :class="$style.label">
        <slot name="label" />
      </div>
      <div
        v-if="$slots.descr"
        :class="$style.descr"
      >
        <slot name="descr" />
      </div>
    </div>
    <div :class="$style.control">
      <slot
        :disabled="disabled"
        name="control"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabledIfNotSetting: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    disabled() {
      if (!this.disabledIfNotSetting) return false;
      const relatedSettings = this.disabledIfNotSetting.reduce((settings, item) => {
        settings.push(this.$store.getters['Settings/byKey'](item));
        return settings;
      }, []);

      return relatedSettings.some((val) => !val);
    },
  },
};
</script>

<style lang="postcss" module>
.wrap {
  @apply flex items-center bg-gray-900 rounded;
}

.wrap + .wrap {
  @apply mt-2;
}

.disabled {
  @apply opacity-50 pointer-events-none;
}

.body {
  @apply flex-grow p-2 pl-4;
}

.label {
  @apply font-medium text-lg;
}

.descr {
  @apply text-gray-600;
}

.control {
  @apply flex-shrink-0 p-2 pr-4 min-w-0;
}
</style>
