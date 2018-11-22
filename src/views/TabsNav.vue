<template>
  <div>
    <router-link
      :to="{ name: 'notifications' }"
      tag="button"
      class="flex flex-grow items-center pt-px pl-2 -mb-px w-full text-grey-dark text-left"
      active-class="text-grey bg-grey-darkest"
    >
      <div
        class="
          flex flex-no-shrink justify-center items-center p-1 w-8 h-8 -mt-px mr-3
          bg-grey-darkest rounded-full shadow
        "
      >
        <app-icon face="bell" />
      </div>
      <div
        class="flex flex-grow items-center py-4 pr-2 text-overflow border-b border-grey-darkest"
      >Notifications</div>
    </router-link>
    <vue-draggable
      v-model="tabList"
      element="nav"
    >
      <div
        v-for="tab in tabList"
        :key="tab.ident"
        class="flex"
      >
        <router-link
          :to="{ name: 'tabs', params: { ident: tab.ident } }"
          tag="button"
          class="flex flex-grow items-center pt-px pl-2 -mb-px w-full text-grey-dark text-left"
          active-class="text-grey bg-grey-darkest"
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
        </router-link>
      </div>
    </vue-draggable>
  </div>
</template>

<script>
import VueDraggable from 'vuedraggable';

export default {
  components: {
    VueDraggable,
  },
  computed: {
    tabList: {
      get() {
        return this.$store.getters['Tabs/list'];
      },
      set(items) {
        this.$store.commit('Tabs/setList', items);
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
