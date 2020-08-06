<template>
  <title-bar>
    <title-bar-text>
      {{ pageState.title }}
    </title-bar-text>
    <title-bar-button
      :disabled="!canGoBack"
      icon="arrow-left"
      title="Go back one page"
      @click="$emit('execute', ['goBack'])"
    />
    <title-bar-button
      :disabled="!canGoForward"
      icon="arrow-right"
      title="Go forward one page"
      @click="$emit('execute', ['goForward'])"
    />
    <title-bar-button
      icon="refresh"
      title="Reload page"
      @click="$emit('execute', ['reload'])"
    />
    <title-bar-button
      ref="menuBtn"
      :key="`menuBtn${_uid}`"
      icon="dots-vertical"
      title="Tab controls"
      @click="showMenu"
    />
  </title-bar>
</template>

<script>
import { remote } from 'electron';
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
    canGoBack: {
      type: Boolean,
      default: false,
    },
    canGoForward: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    pageState() {
      return this.$store.getters['Pages/state'](this.item.id);
    },
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
      this.$router.push({ name: 'welcome' });
    },
    showMenu() {
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
        { type: 'separator' },
        {
          label: 'Edit',
          click: () => this.$router.push({ name: 'tabs-edit', params: { id: this.item.id } }),
        },
        {
          label: 'Delete',
          click: () => this.deleteTab(),
        },
        { type: 'separator' },
        {
          label: 'Show devtools',
          click: () => this.$emit('execute', ['toggleDevTools']),
        },
      ]);

      // remove :key from ref="menuBtn" element once this is fixed:
      // https://github.com/LinusBorg/portal-vue/issues/294
      const btnRect = this.$refs.menuBtn.$el.getBoundingClientRect();

      settingsMenu.popup({
        x: btnRect.x,
        y: btnRect.y + btnRect.height,
      });
    },
  },
};
</script>
