<template>
  <div>
    <div :class="$style.tabList">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{
          [$style.tabBtn]: true,
          [$style.tabBtnActive]: isActiveTab(tab),
        }"
        type="button"
        @click="setActiveTab(tab)"
        v-text="tab"
      />
    </div>

    <div
      v-for="tab in tabs"
      v-show="isActiveTab(tab)"
      :key="tab"
    >
      <slot :name="tab" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      activeTab: '',
    };
  },
  computed: {
    tabs(): string[] {
      return Object.keys(this.$slots);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: 'setActiveTab',
    },
  },
  created() {
    if (!this.value) {
      const [firstTab] = this.tabs;
      this.activeTab = firstTab;
    }
  },
  methods: {
    isActiveTab(tabName: string) {
      return this.activeTab === tabName;
    },
    setActiveTab(tabName: string) {
      this.activeTab = tabName;
      this.$emit('input', tabName);
    },
  },
});
</script>

<style lang="postcss" module>
.tabList {
  @apply flex border-gray-600 border-b-2;
}

.tabBtn {
  @apply px-4 py-2 font-medium rounded-t;
}

.tabBtnActive {
  @apply bg-gray-700;
}
</style>
