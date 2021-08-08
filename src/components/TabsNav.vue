<template>
  <vue-draggable
    v-if="tabList.length"
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
      v-for="(tab, index) in tabList"
      :key="tab.id"
      :index="index"
      :item="tab"
      :show-label="displaysTabLabels"
    />
  </vue-draggable>
  <div v-else />
</template>

<script>
import { ipcRenderer as ipc } from 'electron-better-ipc';
import VueDraggable from 'vuedraggable';
import TabsNavItem from '@/components/TabsNavItem.vue';

export default {
  components: {
    VueDraggable,
    TabsNavItem,
  },
  data() {
    return {
      ipcListeners: [],
    };
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
  created() {
    this.ipcListeners.push(
      ipc.answerMain('app-tabs-sort-prev-by-id', (tabId) => this.sortById(tabId, 'prev')),
      ipc.answerMain('app-tabs-sort-next-by-id', (tabId) => this.sortById(tabId, 'next')),
      ipc.answerMain('app-tabs-sort-first-by-id', (tabId) => this.sortById(tabId, 'first')),
      ipc.answerMain('app-tabs-sort-last-by-id', (tabId) => this.sortById(tabId, 'last')),
    );
  },
  beforeDestroy() {
    this.ipcListeners.forEach((listener) => listener());
  },
  methods: {
    sortById(tabId, mode) {
      const list = [...this.tabList];
      const fromIndex = list.findIndex(({ id }) => id === tabId);
      if (fromIndex < 0) return;

      const toIndex = (() => {
        switch (mode) {
          case 'prev': return fromIndex - 1;
          case 'next': return fromIndex + 1;
          case 'first': return 0;
          case 'last': return list.length - 1;
          default: return -1;
        }
      })();
      if (toIndex < 0 || toIndex > list.length - 1) return;

      const tab = list[fromIndex];
      list.splice(fromIndex, 1);
      list.splice(toIndex, 0, tab);

      this.$store.commit('Tabs/setSorting', list);
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
