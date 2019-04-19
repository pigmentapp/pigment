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
    <div :class="$style.title">
      {{ item.title }}
    </div>
    <title-bar-button
      icon="code-tags"
      @click="$emit('toggleDevTools')"
    />
    <title-bar-button
      icon="dots-vertical"
      @click="$emit('toggleSettings')"
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
  },
  computed: {
    isLayoutInverted() {
      return this.$store.getters['Settings/isLayoutInvertedForOs'];
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
