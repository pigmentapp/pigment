<template>
  <div class="py-2">
    <button
      class="text-grey mr-3"
      @click="goToHome"
    >
      Home
    </button>
    <button
      class="text-grey mr-3"
      @click="reloadTab"
    >
      Reload
    </button>
    <button
      class="text-grey mr-3"
      @click="isDimActive = !isDimActive"
    >
      Dim {{ isDimActive ? 'on' : 'off' }}
    </button>
    <button
      class="text-grey mr-3"
      @click="tabSettings"
    >
      Settings
    </button>
    <button
      class="text-grey mr-3"
      @click="tabDevTools"
    >
      Dev
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
    isDimActive: {
      get() {
        return this.$store.getters['Settings/isDimActive'];
      },
      set(value) {
        this.$store.commit('Settings/setDimActive', value);
      },
    },
  },
  methods: {
    goToHome() {
      TabEvents.$emit('goHomeByIdent', this.activeTab.ident);
    },
    reloadTab() {
      TabEvents.$emit('reloadByIdent', this.activeTab.ident);
    },
    tabSettings() {
      TabEvents.$emit('settingsByIdent', this.activeTab.ident);
    },
    tabDevTools() {
      TabEvents.$emit('devtoolsByIdent', this.activeTab.ident);
    },
  },
};
</script>

<style>

</style>
