<template>
  <vue-draggable
    v-model="tabList"
    :class="$style.nav"
    :animation="150"
    :delay="150"
    :chosen-class="$style.drag"
    :drag-class="$style.helper"
    direction="vertical"
    tag="nav"
  >
    <tabs-nav-item
      v-for="tab in tabList"
      :key="tab.id"
      :item="tab"
      :show-label="displaysTabLabels"
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
    displaysTabLabels() {
      return this.$store.getters['Settings/byKey']('navigation.displayTabLabels');
    },
  },
};
</script>

<style lang="postcss" module>
.nav {
  @apply
    relative flex flex-col
    px-1 pb-1 overflow-x-hidden overflow-y-auto
  ;
}

.nav::-webkit-scrollbar {
  @apply w-px;
}

.nav::-webkit-scrollbar-thumb {
  @apply border-l-0 border-r-0;
}

.drag {
  @apply cursor-move text-gray-300 bg-gray-500;
}

.helper {
  @apply opacity-0;
}
</style>
