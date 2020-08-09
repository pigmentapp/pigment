<template>
  <portal to="titleBar">
    <slot />
    <title-bar-button
      v-if="backButton"
      icon="ArrowLeft"
      title="Back to previous view"
      @click="$router.back()"
    />
  </portal>
</template>

<script>
import TitleBarButton from '@/components/TitleBarButton.vue';

export default {
  components: {
    TitleBarButton,
  },
  props: {
    backButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
