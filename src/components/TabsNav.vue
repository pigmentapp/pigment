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
    <div
      slot="footer"
      :class="{
        [$style.footer]: true,
      }"
    >
      <side-bar-button
        :to="{ name: 'tabs-create' }"
        icon="tab-plus"
      />
      <side-bar-button
        :to="{ name: 'notifications' }"
        icon="bell"
      />
      <side-bar-button
        :to="{ name: 'settings' }"
        icon="settings"
      />
    </div>
  </vue-draggable>
</template>

<script>
import VueDraggable from 'vuedraggable';
import SideBarButton from '@/components/SideBarButton.vue';
import TabsNavItem from '@/components/TabsNavItem.vue';

export default {
  components: {
    VueDraggable,
    SideBarButton,
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
  @apply
    relative flex flex-col flex-grow justify-start
    px-1 pb-1 overflow-x-hidden overflow-y-auto
  ;
}

.footer {
  @apply mt-auto;
}

.drag {
  @apply cursor-move text-blue-lighter bg-blue;
}

.helper {
  @apply opacity-0;
}
</style>
