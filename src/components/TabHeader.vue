<template>
  <title-bar :indent="isLayoutInverted">
    <title-bar-button
      icon="home-variant"
      @click="$emit('goToHome')"
    />
    <title-bar-button
      icon="refresh"
      @click="$emit('doReload')"
    />
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
    <div :class="$style.title">
      {{ pageState.title }}
    </div>
    <title-bar-button
      icon="code-tags"
      @click="$emit('toggleDevTools')"
    />
    <title-bar-button
      :to="{ name: 'tabs-settings', params: { id: item.id } }"
      icon="dots-vertical"
    />
  </title-bar>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import TitleBarButton from '@/components/TitleBarButton.vue';

export default {
  components: {
    TitleBar,
    TitleBarButton,
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
      return this.$store.getters['Settings/isLayoutInvertedForOs'];
    },
    pageState() {
      return this.$store.getters['Pages/state'](this.item.id);
    },
  },
};
</script>

<style lang="postcss" module>
.title {
  @apply flex-1 p-2 text-sm truncate;
  -webkit-user-select: none;
}
</style>
