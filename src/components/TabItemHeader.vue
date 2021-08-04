<template>
  <title-bar>
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
import { clipboard, remote } from 'electron';
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
  },
  created() {
    this.ipcListeners.push(
      ipc.answerMain('app-tabs-active-reload', () => { this.$emit('execute', ['reload']); }),
      ipc.answerMain('app-tabs-active-reload-hard', () => { this.$emit('execute', ['reloadIgnoringCache']); }),
      ipc.answerMain('app-tabs-active-edit', () => { this.$router.push({ name: 'tabs-edit', params: { id: this.item.id } }); }),
      ipc.answerMain('app-tabs-active-delete', () => { this.deleteTab(); }),
      ipc.answerMain('app-tabs-active-toggle-devtools', () => { this.$emit('execute', ['toggleDevTools']); }),
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

      const settingsMenu = remote.Menu.buildFromTemplate([
        {
          label: 'Go to homepage',
          type: 'checkbox',
          checked: this.item.url === this.pageState.url,
          click: () => this.$emit('execute', ['loadURL', this.item.url]),
        },
        {
          label: 'Set as homepage',
          type: 'checkbox',
          checked: this.item.url === this.pageState.url,
          click: () => this.setAsHome(),
        },
        {
          label: 'Hard reload',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => this.$emit('execute', ['reloadIgnoringCache']),
        },
        {
          label: 'Copy URL to clipboard',
          click: () => clipboard.writeText(this.pageState.url),
        },
        { type: 'separator' },
        {
          label: 'Edit',
          accelerator: 'CmdOrCtrl+E',
          click: () => this.$router.push({ name: 'tabs-edit', params: { id: this.item.id } }),
        },
        {
          label: 'Delete',
          accelerator: 'CmdOrCtrl+W',
          click: () => this.deleteTab(),
        },
        { type: 'separator' },
        {
          label: 'Show devtools',
          accelerator: 'CmdOrCtrl+Shift+I',
          click: () => this.$emit('execute', ['toggleDevTools']),
        },
      ]);

      // remove :key from ref="menuBtn" element once this is fixed:
      // https://github.com/LinusBorg/portal-vue/issues/294
      const btnRect = this.$refs.menuBtn.$el.getBoundingClientRect();

      settingsMenu.popup({
        x: Math.trunc(btnRect.x),
        y: Math.trunc(btnRect.y + btnRect.height),
        callback: () => {
          setTimeout(() => {
            this.isMenuOpen = false;
          }, 10);
        },
      });
    },
  },
};
</script>
