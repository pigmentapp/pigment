<template>
  <title-bar>
    <title-bar-text>
      {{ pageState.title }}
    </title-bar-text>
    <title-bar-button
      :disabled="!canGoBack"
      icon="arrow-left"
      @click="$emit('goBack')"
    />
    <title-bar-button
      :disabled="!canGoForward"
      icon="arrow-right"
      @click="$emit('goForward')"
    />
    <title-bar-button
      icon="refresh"
      @click="$emit('doReload')"
    />
    <title-bar-button icon="dots-vertical">
      <template slot="dropdown">
        <title-bar-button
          icon="home-variant"
          @click="$emit('goToHome')"
        >
          Go to homepage
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
    isLayoutInverted() {
      return this.$store.getters['Settings/byKey']('layout.sideBarLocation') === 'right';
    },
    pageState() {
      return this.$store.getters['Pages/state'](this.item.id);
    },
  },
};
</script>
