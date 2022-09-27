<template>
  <title-bar>
    <div
      v-if="pageState.certificateError"
      :class="$style.isCertError"
      title="Certificate Error"
    >
      <app-icon face="LockOpenAlert" />
    </div>
    <div
      v-else-if="isInsecure"
      :class="$style.isInsecure"
      title="Insecure"
    >
      <app-icon face="LockOff" />
    </div>
    <title-bar-text>
      {{ title }}
    </title-bar-text>
    <title-bar-button
      :disabled="!pageState.canGoBack"
      icon="ArrowLeft"
      title="Go back one page"
      @click="$emit('execute', ['goBack'])"
    />
    <title-bar-button
      :disabled="!pageState.canGoForward"
      icon="ArrowRight"
      title="Go forward one page"
      @click="$emit('execute', ['goForward'])"
    />
    <title-bar-button
      icon="Refresh"
      title="Reload page"
      @click="$emit('execute', ['reload'])"
    />
    <title-bar-button
      ref="menuBtn"
      :key="`menuBtn${_uid}`"
      :active="isMenuOpen"
      icon="DotsVertical"
      title="Tab controls"
      @mousedown="showMenu"
    />
  </title-bar>
</template>

<script>
import { ipcRenderer as ipc } from 'electron-better-ipc';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarButton from '@/components/TitleBarButton.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  components: {
    TitleBar,
    TitleBarButton,
    TitleBarText,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      ipcListeners: [],
    };
  },
  computed: {
    title() {
      const { title, url } = this.pageState;
      return this.isMenuOpen ? url : title || url;
    },
    pageState() {
      return this.$store.getters['Pages/state'](this.item.id);
    },
    isInsecure() {
      const url = new URL(this.pageState.url || '');
      return !url.protocol.endsWith('s:');
    },
  },
  created() {
    this.ipcListeners.push(
      ipc.answerMain('app-tabs-active-reload', () => { this.$emit('execute', ['reload']); }),
      ipc.answerMain('app-tabs-active-reload-hard', () => { this.$emit('execute', ['reloadIgnoringCache']); }),
      ipc.answerMain('app-tabs-active-edit', () => { this.$router.push({ name: 'tabs-edit', params: { id: this.item.id } }); }),
      ipc.answerMain('app-tabs-active-delete', () => { this.deleteTab(); }),
      ipc.answerMain('app-tabs-active-toggle-devtools', () => { this.$emit('execute', ['toggleDevTools']); }),
      ipc.answerMain('app-tabs-active-go-to-home', () => { this.$emit('execute', ['loadURL', this.item.url]); }),
      ipc.answerMain('app-tabs-active-set-as-home', () => { this.setAsHome(); }),
      ipc.answerMain('app-tabs-active-menu-close', () => { this.isMenuOpen = false; }),
    );
  },
  beforeDestroy() {
    this.ipcListeners.forEach((listener) => listener());
  },
  methods: {
    setAsHome() {
      this.$store.commit('Tabs/update', {
        id: this.item.id,
        data: {
          url: this.pageState.url,
        },
      });
    },
    deleteTab() {
      if (!window.confirm('Do you really want to delete this tab?')) return; // eslint-disable-line no-alert
      this.$store.commit('Tabs/delete', this.item);
      this.$router.push({ name: 'home' });
    },
    showMenu() {
      if (this.isMenuOpen) return;
      this.isMenuOpen = true;

      // remove :key from ref="menuBtn" element once this is fixed:
      // https://github.com/LinusBorg/portal-vue/issues/294
      const btnRect = this.$refs.menuBtn.$el.getBoundingClientRect();

      ipc.callMain('app-show-tab-menu', {
        currentUrl: this.pageState.url,
        startUrl: this.item.url,
        x: Math.trunc(btnRect.x),
        y: Math.trunc(btnRect.y + btnRect.height),
      });
    },
  },
};
</script>

<style lang="postcss" module>
.isCertError {
  @apply mr-1 text-red-500;
  -webkit-app-region: no-drag;
}

.isInsecure {
  @apply mr-1 text-yellow-500;
  -webkit-app-region: no-drag;
}
</style>
