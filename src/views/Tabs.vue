<template>
  <div>
    <tab-main
      v-for="tab in $store.getters['Tabs/list']"
      :key="tab.ident"
      :item="tab"
    />
    <router-view/>
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
