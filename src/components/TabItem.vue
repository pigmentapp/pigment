<template>
  <tab-item-browser-view
    ref="bv"
    v-slot="{ executeMethod }"
    :item="item"
  >
    <tab-item-header
      :item="item"
      @execute="(e) => executeMethod(e)"
    />
  </tab-item-browser-view>
</template>

<script lang="ts">
import { ipcRenderer as ipc, RendererProcessIpc } from 'electron-better-ipc';
import Vue from 'vue';
import TabItemHeader from '@/components/TabItemHeader.vue';
import TabItemBrowserView from '@/components/TabItemBrowserView.vue';

export default Vue.extend({
  components: {
    TabItemHeader,
    TabItemBrowserView,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    const ipcListeners: Array<ReturnType<RendererProcessIpc['answerMain']>> = [];

    return { ipcListeners };
  },
  mounted() {
    const bv = (this.$refs.bv as InstanceType<typeof TabItemBrowserView>);
    this.ipcListeners.push(
      ipc.answerMain('app-tabs-reload-by-id', (tabId) => { if (tabId !== this.item.id) return; bv.executeMethod({ methodName: 'reload', methodParams: [] }); }),
      ipc.answerMain('app-tabs-reload-hard-by-id', (tabId) => { if (tabId !== this.item.id) return; bv.executeMethod({ methodName: 'reloadIgnoringCache', methodParams: [] }); }),
      ipc.answerMain('app-tabs-edit-by-id', (tabId) => { if (tabId !== this.item.id) return; this.editTab(); }),
      ipc.answerMain('app-tabs-delete-by-id', (tabId) => { if (tabId !== this.item.id) return; this.deleteTab(); }),
      ipc.answerMain('app-tabs-toggle-devtools-by-id', (tabId) => { if (tabId !== this.item.id) return; bv.executeMethod({ methodName: 'toggleDevTools', methodParams: [] }); }),
    );
  },
  beforeDestroy() {
    this.ipcListeners.forEach((listener) => listener());
  },
  methods: {
    deleteTab() {
      if (!window.confirm('Do you really want to delete this tab?')) return; // eslint-disable-line no-alert
      this.$store.commit('Tabs/delete', this.item);
      this.$router.push({ name: 'home' });
    },
    editTab() {
      this.$router.push({ name: 'tabs-edit', params: { id: this.item.id } });
    },
  },
});
</script>
