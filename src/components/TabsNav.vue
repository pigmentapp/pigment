<template>
  <vue-draggable
    v-model="tabList"
    :class="$style.nav"
    :delay="400"
    :chosen-class="$style.drag"
    :drag-class="$style.helper"
    tag="nav"
  >
    <tabs-nav-item
      v-for="tab in tabList"
      :key="tab.id"
      :item="tab"
    />
  </vue-draggable>
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

<style lang="postcss" module>
.nav {
  @apply relative flex flex-col p-1 overflow-x-hidden overflow-y-auto;
  background-color: #0002;
}

.drag {
  @apply cursor-move text-blue-lighter bg-blue;
}
.helper {
  @apply opacity-0;
}
</style>
