<template>
  <tab-item-browser-view
    ref="bv"
    #default="{ executeMethod }"
    :item="item"
  >
    <tab-item-header
      :item="item"
      @execute="(e) => executeMethod(e)"
    />
  </tab-item-browser-view>
</template>

<script>
import { ipcRenderer as ipc } from 'electron-better-ipc';
import TabItemHeader from '@/components/TabItemHeader.vue';
import TabItemBrowserView from '@/components/TabItemBrowserView.vue';

export default {
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
    return {
      ipcListeners: [],
    };
  },
  created() {
    this.ipcListeners.push(
      ipc.answerMain('app-tabs-reload-by-id', (tabId) => { if (tabId !== this.item.id) return; this.$refs.bv.executeMethod(['reload']); }),
      ipc.answerMain('app-tabs-reload-hard-by-id', (tabId) => { if (tabId !== this.item.id) return; this.$refs.bv.executeMethod(['reloadIgnoringCache']); }),
      ipc.answerMain('app-tabs-edit-by-id', (tabId) => { if (tabId !== this.item.id) return; this.editTab(); }),
      ipc.answerMain('app-tabs-delete-by-id', (tabId) => { if (tabId !== this.item.id) return; this.deleteTab(); }),
      ipc.answerMain('app-tabs-toggle-devtools-by-id', (tabId) => { if (tabId !== this.item.id) return; this.$refs.bv.executeMethod(['toggleDevTools']); }),
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
};
</script>
