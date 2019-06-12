<template>
  <title-bar>
    <title-bar-text>
      {{ pageState.title }}
    </title-bar-text>
    <title-bar-button
      :disabled="!canGoBack"
      icon="arrow-left"
      title="Go back one page"
      @click="$emit('goBack')"
    />
    <title-bar-button
      :disabled="!canGoForward"
      icon="arrow-right"
      title="Go forward one page"
      @click="$emit('goForward')"
    />
    <title-bar-button
      icon="refresh"
      title="Reload page"
      @click="$emit('doReload')"
    />
    <title-bar-button
      icon="dots-vertical"
      title="Tab controls"
    >
      <template slot="dropdown">
        <title-bar-button
          icon="home"
          @click="$emit('goToHome')"
        >
          Go to homepage
        </title-bar-button>
        <title-bar-button
          :disabled="item.url === pageState.url"
          icon="home-heart"
          @click="setAsHome"
        >
          Set as homepage
        </title-bar-button>
        <title-bar-button
          icon="code-tags"
          @click="$emit('toggleDevTools')"
        >
          Show devtools
        </title-bar-button>
        <title-bar-button
          :to="{ name: 'tabs-settings', params: { id: item.id } }"
          icon="pencil"
        >
          Edit tab
        </title-bar-button>
        <title-bar-button
          icon="delete-forever"
          @click="deleteTab"
        >
          Delete tab
        </title-bar-button>
      </template>
    </title-bar-button>
  </title-bar>
</template>

<script>
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
      default: () => ({}),
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
      this.$store.commit('Tabs/delete', this.item);
      this.$router.push({ name: 'welcome' });
    },
  },
};
</script>
