<template>
  <settings-item :disabled-if-not-setting="disabledIfNotSetting">
    <template slot="label"><slot name="label" /></template>
    <template slot="descr"><slot name="descr" /></template>
    <template v-slot:control="{ disabled }">
      <input
        v-model.lazy="value"
        :class="$style.input"
        :disabled="disabled"
        v-bind="$attrs"
      >
    </template>
  </settings-item>
</template>

<script>
import SettingsItem from '@/components/SettingsItem.vue';

export default {
  components: {
    SettingsItem,
  },
  inheritAttrs: false,
  props: {
    getModifier: {
      type: Function,
      default: undefined,
    },
    setModifier: {
      type: Function,
      default: undefined,
    },
    setting: {
      type: String,
      required: true,
    },
    disabledIfNotSetting: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    value: {
      get() {
        const setting = this.$store.getters['Settings/byKey'](this.setting);

        if (this.getModifier) return this.getModifier(setting);
        return setting;
      },
      set(value) {
        let val = value;

        if (this.getModifier) val = this.setModifier(val);
        this.$store.dispatch('Settings/set', [this.setting, val]);
      },
    },
  },
};
</script>

<style lang="postcss" module>
.input {
  @apply
    block px-4 py-2 w-32
    leading-tight appearance-none bg-gray-700
    border border-gray-600 rounded;
}
</style>
