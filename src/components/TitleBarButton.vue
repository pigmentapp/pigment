<template>
  <component
    :is="to ? 'router-link' : tag"
    :to="to"
    :tag="tag"
    :type="tag === 'button' && 'button'"
    :class="{
      [$style.btn]: true,
      [$style[schema]]: true,
      [$style.active]: active,
    }"
    @click="$emit('click')"
  >
    <app-icon :face="icon" />
  </component>
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
    schema: {
      type: String,
      default: 'blue',
    },
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: [Object, String],
      default: undefined,
    },
  },
};
</script>

<style lang="postcss" module>
.btn {
  @apply p-2 leading-none appearance-none text-grey-dark;
}

.blue:hover {
  @apply text-blue-lighter bg-blue;
}

.red:hover {
  @apply text-red-lighter bg-red-dark;
}

.orange:hover {
  @apply text-orange-lighter bg-orange-dark;
}

.green:hover {
  @apply text-green-lighter bg-green-dark;
}

.active {
  @apply text-blue-lighter bg-blue;
}
</style>
