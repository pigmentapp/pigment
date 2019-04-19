<template>
  <div
    v-show="isActive"
    :class="$style.wrap"
  >
    <tab-header
      v-if="isActive"
      :item="item"
      @doReload="reloadTab"
      @goToHome="goToHome"
      @toggleDevTools="toggleDevTools"
    />

    <tab-webview
      ref="webview"
      :item="item"
    />
  </div>
</template>

<script>
import TabHeader from '@/components/TabHeader.vue';
import TabWebview from '@/components/TabWebview.vue';

export default {
  components: {
    TabHeader,
    TabWebview,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isActive() {
      return parseInt(this.$route.params.id, 0) === this.item.id;
    },
    webview() {
      return this.$refs.webview.$refs.webview;
    },
  },
  watch: {
    isActive(isActive) {
      if (isActive) {
        this.$store.commit('Tabs/activateId', this.item.id);
        this.webview.focus();
      }
    },
  },
  methods: {
    goToHome() {
      this.webview.loadURL(this.item.url);
    },
    reloadTab() {
      this.webview.reload();
    },
    toggleDevTools() {
      if (this.webview.isDevToolsOpened()) {
        this.webview.closeDevTools();
      } else {
        this.webview.openDevTools();
      }
    },
  },
};
</script>

<style lang="postcss" module>
.wrap {
  @apply flex flex-1 flex-col;
}
</style>
