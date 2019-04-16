<template>
  <div class="flex flex-col">
    <tabs-nav-item
      :to="{ name: 'notifications' }"
      label="Notifications"
      icon="bell"
    />
    <vue-draggable
      v-model="tabList"
      element="nav"
      class="flex flex-col mt-2"
    >
      <tabs-nav-item
        v-for="tab in tabList"
        :key="tab.ident"
        :label="tab.label"
        :image="tab.favicon"
        :to="{ name: 'tabs', params: { ident: tab.ident } }"
      />
    </vue-draggable>
  </div>
</template>

<script>
import VueDraggable from 'vuedraggable';
import TabsNavItem from '@/components/TabsNavItem.vue';

export default {
  components: {
    VueDraggable,
    TabsNavItem,
  },
  computed: {
    tabList: {
      get() {
        return this.$store.getters['Tabs/listSorted'];
      },
      set(items) {
        this.$store.commit('Tabs/setSorting', items);
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.text-overflow {
  @apply overflow-hidden whitespace-no-wrap;
  text-overflow: ellipsis;
}
</style>
