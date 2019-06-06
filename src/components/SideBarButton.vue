<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :active-class="$style.active"
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
  @apply
    block w-full p-2
    text-gray-600 text-center;
}

.active {
  @apply text-gray-600;
}
</style>
