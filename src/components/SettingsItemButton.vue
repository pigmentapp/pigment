<template>
  <settings-item :disabled-if-not-setting="disabledIfNotSetting">
    <template slot="label">
      <slot name="label" />
    </template>
    <template slot="descr">
      <slot name="descr" />
    </template>
    <template #control="{ disabled }">
      <app-button
        :disabled="disabled"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <slot name="control" />
      </app-button>
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
  inheritAttrs: false,
  props: {
    disabledIfNotSetting: {
      type: Array as () => string[],
      default: undefined,
    },
  },
});
</script>
