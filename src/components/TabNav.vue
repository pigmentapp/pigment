<template>
  <div>
    <vue-draggable
      v-model="tabList"
      element="nav"
    >
      <div
        v-for="tab in tabList"
        :key="tab.ident"
        class="flex"
      >
        <button
          :class="tab.ident === activeTab.ident && ['text-grey', 'bg-grey-darkest']"
          class="flex flex-grow items-center pt-px pl-2 -mb-px w-full text-grey-dark text-left"
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
        <button
          :class="tab.ident === activeTab.ident && ['text-grey', 'bg-grey-darkest']"
          class="pt-px pr-2 -mb-px text-grey-dark text-left"
          @click="deleteTab(tab)"
        >
          &times;
        </button>
      </div>
    </vue-draggable>

    <button
      class="flex items-center w-full p-2"
      @click="$store.dispatch('Tabs/add')"
    >
      <div class="flex items-center justify-center w-8 h-8 mr-3 text-4xl text-grey-dark">
        +
      </div>
      <div class="text-grey-darker">
        Create Tab
      </div>
    </button>
  </div>
</template>

<script>
import VueDraggable from 'vuedraggable';

export default {
  components: {
    VueDraggable,
  },
  computed: {
    activeTab() {
      return this.$store.getters['Tabs/active'];
    },
    tabList: {
      get() {
        return this.$store.getters['Tabs/list'];
      },
      set(items) {
        this.$store.commit('Tabs/setList', items);
      },
    },
  },
  methods: {
    deleteTab(item) {
      this.$store.commit('Tabs/delete', item);
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
