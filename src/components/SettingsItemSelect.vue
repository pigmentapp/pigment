<template>
  <settings-item :disabled-if-not-setting="disabledIfNotSetting">
    <template slot="label">
      <slot name="label" />
    </template>
    <template slot="descr">
      <slot name="descr" />
    </template>
    <template #control="{ disabled }">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
      <select
        v-model="value"
        :class="$style.select"
        :disabled="disabled"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
  </settings-item>
</template>

<script lang="ts">
import Vue from 'vue';
import SettingsItem from '@/components/SettingsItem.vue';

export default Vue.extend({
  components: {
    SettingsItem,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    setting: {
      type: String,
      required: true,
    },
    disabledIfNotSetting: {
      type: Array as () => string[],
      default: undefined,
    },
  },
  computed: {
    value: {
      get(): unknown {
        return this.$store.getters['Settings/byKey'](this.setting);
      },
      set(value: unknown) {
        this.$store.dispatch('Settings/set', [this.setting, value]);
      },
    },
  },
});
</script>

<style lang="postcss" module>
.select {
  @apply
    block px-4 py-2 w-32
    leading-tight appearance-none bg-gray-700
    border border-gray-600 rounded;
}
</style>
