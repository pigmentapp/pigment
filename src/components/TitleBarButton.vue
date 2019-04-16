<template>
  <button
    :class="{
      [$style.btn]: true,
      [$style.active]: active,
    }"
    type="button"
    @click="$emit('click')"
  >
    <app-icon :face="icon" />
  </button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="postcss" module>
.btn {
  @apply p-2 leading-none appearance-none text-grey-dark;
}

.btn:hover {
  @apply text-blue-lighter bg-blue;
}

.active {
  @apply text-blue-lighter bg-blue;
}
</style>
