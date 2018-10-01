<template>
  <div>
    <nav class="flex-grow">
      <button
        v-for="tab in tabList"
        :key="tab.ident"
        :class="tab.ident === activeTab.ident && ['text-grey', 'bg-grey-darkest']"
        class="flex items-center pt-px pl-2 -mb-px w-full text-grey-dark text-left"
        @click="$store.commit('Tabs/activateIdent', tab.ident)"
      >
        <div
          class="
            flex flex-no-shrink justify-center items-center p-1 w-8 h-8 -mt-px mr-3
            bg-grey-light rounded-full shadow
          "
        >
          <img
            :src="tab.favicon"
            class="block max-w-full max-h-full"
          >
        </div>
        <div
          class="flex flex-grow items-center py-4 pr-2 text-overflow border-b border-grey-darkest"
        >
          <div class="text-overflow">
            {{ tab.label }}
          </div>
        </div>
      </button>
    </nav>

    <template v-if="showCreateForm">
      <tab-create
        class="p-2 border-t border-grey-darker"
        @submitted="showCreateForm = !showCreateForm"
      />
    </template>
    <div
      v-else
      class="p-2"
    >
      <app-button @click="showCreateForm = !showCreateForm">
        + Create Tab
      </app-button>
    </div>
  </div>
</template>

<script>
import TabCreate from '@/components/TabCreate.vue';

export default {
  components: {
    TabCreate,
  },
  data() {
    return {
      showCreateForm: false,
    };
  },
  computed: {
    activeTab() {
      return this.$store.getters['Tabs/active'];
    },
    tabList() {
      return this.$store.getters['Tabs/list'];
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
