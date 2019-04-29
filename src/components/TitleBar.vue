<template>
  <portal to="titleBar">
    <slot />
    <title-bar-button
      v-if="backButton"
      icon="arrow-left"
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
