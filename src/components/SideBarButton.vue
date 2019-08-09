<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :class="$style.btn"
    :to="to"
    tag="button"
    v-on="$listeners"
  >
    <app-icon
      :face="icon"
      :size="6"
    />
  </component>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    to: {
      type: Object,
      default: undefined,
    },
  },
};
</script>

<style lang="postcss" module>
.btn {
  @apply p-2 text-gray-600 text-center;
}
</style>
