<template>
  <settings-item :disabled-if-not-setting="disabledIfNotSetting">
    <template slot="label">
      <slot name="label" />
    </template>
    <template slot="descr">
      <slot name="descr" />
    </template>
    <template #control="{ disabled }">
      <button
        :class="$style.button"
        :disabled="disabled"
        :title="`Toggle ${value ? 'off' : 'on'}`"
        @click="value = !value"
      >
        <app-icon
          :size="8"
          :class="value && !disabled && $style.active"
          :face="value ? 'ToggleSwitch' : 'ToggleSwitchOff'"
        />
      </button>
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
      get(): boolean {
        return this.$store.getters['Settings/byKey'](this.setting);
      },
      set(value: boolean) {
        this.$store.dispatch('Settings/set', [this.setting, value]);
      },
    },
  },
});
</script>

<style lang="postcss" module>
.button {
  @apply block;
}

.active {
  @apply text-green-500;
}
</style>
