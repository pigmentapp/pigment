<template>
  <div
    v-show="isActive"
    :class="$style.wrap"
  >
    <tab-header
      v-if="isActive"
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
      :is-active="isActive"
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
    isActive() {
      return this.$route.params.id === this.item.id;
    },
  },
  watch: {
    isActive(isActive) {
      if (isActive) {
        this.$store.commit('Pages/setState', {
          tabId: this.item.id,
          data: { hasNotificationBadge: false },
        });

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
