<template>
  <div
    v-show="$route.name === 'tabs'"
    :class="$style.tabs"
  >
    <tab-main
      v-for="tab in $store.getters['Tabs/list']"
      :key="tab.id"
      :item="tab"
    />
  </div>
</template>

<script>
import TabMain from '@/components/TabMain.vue';

export default {
  components: {
    TabMain,
  },
};
</script>

<style lang="postcss" module>
.tabs {
  @apply flex flex-col h-full;
}
</style>
