<template>
  <div :class="$style.wrap">
    <tabs-nav-item
      :to="{ name: 'notifications' }"
      label="Notifications"
      icon="bell"
    />
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

<style lang="postcss" module>
.wrap {
  @apply flex flex-col;
}

.nav {
  @apply flex flex-col mt-2;
}

.drag {
  @apply cursor-move text-blue-lighter bg-blue;
}
.helper {
  @apply opacity-0;
}
</style>
