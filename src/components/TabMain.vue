<template>
  <div
    v-show="isActive"
    class="flex flex-grow"
  >
    <webview
      v-show="item.url && !isSettingsView"
      ref="view"
      :src="item.url"
    />

    <tab-settings
      v-show="isSettingsView || !item.url"
      :item="item"
      @submitted="isSettingsView = false"
    />
  </div>
</template>

<script>
import url from 'url';
import { TabEvents } from '@/events';
import TabSettings from '@/components/TabSettings.vue';

export default {
  components: {
    TabSettings,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isSettingsView: false,
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

    this.$refs.view.addEventListener('new-window', (e) => {
      const { protocol } = url.parse(e.url);

      if (protocol === 'http:' || protocol === 'https:') {
        this.$electron.remote.shell.openExternal(e.url);
      }
    });

    TabEvents.$on('reloadByIdent', (ident) => {
      if (this.item.ident === ident) {
        this.$refs.view.reload();
      }
    });

    TabEvents.$on('settingsByIdent', (ident) => {
      if (this.item.ident === ident) {
        this.isSettingsView = !this.isSettingsView;
      }
    });

    TabEvents.$on('goHomeByIdent', (ident) => {
      if (this.item.ident === ident) {
        this.$refs.view.src = this.item.url;
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
