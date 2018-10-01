<template>
  <div class="py-2">
    <button
      class="text-grey mr-3"
      @click="reloadTab"
    >
      Reload
    </button>
    {{ activeTab.title }}
  </div>
</template>

<script>
import { TabEvents } from '@/events';

export default {
  computed: {
    activeTab() {
      return this.$store.getters['Tabs/active'];
    },
  },
  methods: {
    reloadTab() {
      TabEvents.$emit('reloadByIdent', this.activeTab.ident);
    },
  },
};
</script>

<style>

</style>
