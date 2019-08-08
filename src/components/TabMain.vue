<template>
  <div
    v-show="tab.isActive"
    :class="$style.wrap"
  >
    <tab-header
      v-if="tab.isActive"
      :item="item"
      :can-go-back="webviewData.canGoBack"
      :can-go-forward="webviewData.canGoForward"
      @doReload="reloadTab"
      @goToHome="goToHome"
      @goBack="goBack"
      @goForward="goForward"
      @toggleDevTools="toggleDevTools"
    />

    <tab-webview
      ref="webview"
      :item="item"
      :is-active="tab.isActive"
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
  data() {
    return {
      webviewData: {},
      webviewEl: {},
    };
  },
  computed: {
    tab() {
      const { params, name, query } = this.$route;

      return {
        isActive: params.id === this.item.id && name === 'tabs',
        addFocus: !query.doNotFocusWebview,
        id: params.id,
      };
    },
  },
  watch: {
    tab(value) {
      if (!value.isActive) return;

      this.$store.commit('Tabs/setActiveTabId', value.id);

      this.$store.commit('Pages/setState', {
        tabId: value.id,
        data: { hasNotificationBadge: false },
      });

      if (value.addFocus) {
        this.webviewEl.focus();
      }
    },
  },
  mounted() {
    this.webviewData = this.$refs.webview;
    this.webviewEl = this.webviewData.webview;
  },
  methods: {
    goToHome() {
      this.webviewEl.loadURL(this.item.url);
    },
    goBack() {
      this.webviewEl.goBack();
    },
    goForward() {
      this.webviewEl.goForward();
    },
    reloadTab() {
      this.webviewEl.reload();
    },
    toggleDevTools() {
      if (this.webviewEl.isDevToolsOpened()) {
        this.webviewEl.closeDevTools();
      } else {
        this.webviewEl.openDevTools();
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
