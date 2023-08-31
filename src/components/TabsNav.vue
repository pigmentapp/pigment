<template>
  <div>
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
        type="primary"
      />
    </vue-draggable>

    <vue-draggable
      v-if="tabListSecondary.length && showSecondaryTabs"
      v-model="tabListSecondary"
      :class="[$style.nav, $style.navSecondary]"
      :animation="150"
      :delay="150"
      :chosen-class="$style.drag"
      :drag-class="$style.helper"
      direction="vertical"
      tag="nav"
    >
      <tabs-nav-item
        v-for="(tab, index) in tabListSecondary"
        :key="tab.id"
        :index="index"
        :item="tab"
        :show-label="displaysTabLabels"
        type="secondary"
      />
    </vue-draggable>
  </div>
</template>

<script lang="ts">
import { ipcRenderer as ipc, RendererProcessIpc } from 'electron-better-ipc';
import VueDraggable from 'vuedraggable';
import Vue from 'vue';
import TabsNavItem from '@/components/TabsNavItem.vue';
import { Tab } from '@/types';

export default Vue.extend({
  components: {
    VueDraggable,
    TabsNavItem,
  },
  props: {
    showSecondaryTabs: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const ipcListeners: Array<ReturnType<RendererProcessIpc['answerMain']>> = [];

    return {
      ipcListeners,
    };
  },
  computed: {
    tabList: {
      get(): Tab[] {
        return this.$store.getters['Tabs/listSorted'].filter((tab: Tab) => !tab.isSecondary);
      },
      set(items: Tab[]) {
        this.$store.commit('Tabs/setSorting', [...items, ...this.tabListSecondary]);
      },
    },
    tabListSecondary: {
      get(): Tab[] {
        return this.$store.getters['Tabs/listSorted'].filter((tab: Tab) => tab.isSecondary);
      },
      set(items: Tab[]) {
        this.$store.commit('Tabs/setSorting', [...this.tabList, ...items]);
      },
    },
    displaysTabLabels(): boolean {
      return this.$store.getters['Settings/byKey']('navigation.displayTabLabels');
    },
  },
  created() {
    this.ipcListeners.push(
      ipc.answerMain('app-tabs-sort-prev-by-id', (tabId: string) => this.sortById(tabId, 'prev')),
      ipc.answerMain('app-tabs-sort-next-by-id', (tabId: string) => this.sortById(tabId, 'next')),
      ipc.answerMain('app-tabs-sort-first-by-id', (tabId: string) => this.sortById(tabId, 'first')),
      ipc.answerMain('app-tabs-sort-last-by-id', (tabId: string) => this.sortById(tabId, 'last')),
    );
  },
  beforeDestroy() {
    this.ipcListeners.forEach((listener) => listener());
  },
  methods: {
    sortById(tabId: string, mode: string) {
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
});
</script>

<style lang="postcss" module>
.nav {
  @apply relative flex flex-col px-1 pb-1 overflow-x-hidden overflow-y-auto;
}

.nav::-webkit-scrollbar {
  @apply w-px;
}

.nav::-webkit-scrollbar-thumb {
  @apply border-l-0 border-r-0;
}

.navSecondary {
  @apply pt-1;
  background-color: #0006;
}

.drag {
  @apply cursor-move text-gray-300 bg-gray-500;
}

.helper {
  @apply opacity-0;
}
</style>
