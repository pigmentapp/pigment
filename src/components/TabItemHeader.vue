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
      @click="executeMethod({ methodName: 'goBack', methodParams: [] })"
    />
    <title-bar-button
      :disabled="!pageState.canGoForward"
      icon="ArrowRight"
      title="Go forward one page"
      @click="executeMethod({ methodName: 'goForward', methodParams: [] })"
    />
    <title-bar-button
      icon="Refresh"
      title="Reload page"
      @click="executeMethod({ methodName: 'reload', methodParams: [] })"
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

<script lang="ts">
import { ipcRenderer as ipc, RendererProcessIpc } from 'electron-better-ipc';
import Vue from 'vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarButton from '@/components/TitleBarButton.vue';
import TitleBarText from '@/components/TitleBarText.vue';
import { ExecuteWebContentsMethod, PageState, WebContentsMethods } from '@/types';

export default Vue.extend({
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
    const ipcListeners: Array<ReturnType<RendererProcessIpc['answerMain']>> = [];

    return {
      isMenuOpen: false,
      ipcListeners,
    };
  },
  computed: {
    title(): string {
      const { title, url } = this.pageState;
      return this.isMenuOpen ? url : title || url;
    },
    pageState(): PageState {
      return this.$store.getters['Pages/state'](this.item.id);
    },
    isInsecure(): boolean {
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
      const menuBtn = (this.$refs.menuBtn as InstanceType<typeof TitleBarButton>);
      const btnRect = menuBtn.$el.getBoundingClientRect();

      ipc.callMain('app-show-tab-menu', {
        currentUrl: this.pageState.url,
        startUrl: this.item.url,
        x: Math.trunc(btnRect.x),
        y: Math.trunc(btnRect.y + btnRect.height),
      });
    },
    executeMethod<K extends WebContentsMethods>(
      { methodName, methodParams }: Omit<ExecuteWebContentsMethod<K>, 'viewId'>,
    ) {
      this.$emit('execute', { methodName, methodParams });
    },
  },
});
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
