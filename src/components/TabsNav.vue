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
      :show-label="displaysTabLabels"
    />
    <div
      slot="footer"
      :class="{
        [$style.footer]: true,
        [$style.footer__extended]: displaysTabLabels,
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
        icon="settings"
        @click="$electron.remote.app.emit('app-show-settings-menu')"
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
    displaysTabLabels() {
      return this.$store.getters['Settings/byKey']('navigation.displayTabLabels');
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

.footer__extended {
  @apply flex flex-row-reverse;
}

.drag {
  @apply cursor-move text-gray-300 bg-gray-500;
}

.helper {
  @apply opacity-0;
}
</style>
