<template>
  <webview
    ref="view"
    :src="item.url"
    :style="isActive ? '' : 'visibility: hidden;'"
  />
</template>

<script>
import { TabEvents } from '@/events';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      title: 'null',
      favicon: '',
    };
  },
  computed: {
    activeTab() {
      return this.$store.getters['Tabs/active'];
    },
    isActive() {
      return this.item.ident === this.activeTab.ident;
    },
  },
  mounted() {
    this.$refs.view.addEventListener('page-title-updated', (view) => {
      this.$store.commit('Tabs/update', {
        ident: this.item.ident,
        data: {
          title: view.title,
        },
      });
    });
    this.$refs.view.addEventListener('page-favicon-updated', (view) => {
      const favicon = view.favicons[0];

      this.$store.commit('Tabs/update', {
        ident: this.item.ident,
        data: {
          favicon,
        },
      });
    });

    TabEvents.$on('reloadByIdent', (ident) => {
      if (this.item.ident === ident) {
        this.$refs.view.reload();
      }
    });
  },
};
</script>

<style lang="postcss" scoped>
webview {
  @apply absolute pin;
}
</style>
