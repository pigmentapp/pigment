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

<script lang="ts">
import Vue from 'vue';
import TitleBarButton from '@/components/TitleBarButton.vue';

export default Vue.extend({
  components: {
    TitleBarButton,
  },
  props: {
    backButton: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
