<template>
  <router-link
    :active-class="$style.active"
    :class="$style.btn"
    :to="to"
    tag="button"
  >
    <app-icon
      :face="icon"
      :size="6"
    />
  </router-link>
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
      required: true,
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
