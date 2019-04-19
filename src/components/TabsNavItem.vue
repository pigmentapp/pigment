<template>
  <router-link
    :to="to"
    :class="$style.item"
    :active-class="$style.active"
    tag="button"
  >
    <div
      :class="{
        [$style.thumb]: true,
        [$style.thumbIsImage]: image,
        [$style.thumbIsIcon]: !image,
      }"
    >
      <img
        v-if="image"
        :src="image"
        :class="$style.image"
      >
      <app-icon
        v-else
        :face="icon"
      />
    </div>
    <div :class="$style.label">
      {{ label }}
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'tab',
    },
    image: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    to: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="postcss" module>
.item {
  @apply
    flex items-center p-2 mx-1 mt-1
    text-grey-dark text-left rounded-sm;
}

.active {
  @apply text-grey-light bg-grey-darkest shadow;
}

.thumb {
  @apply
    flex flex-no-shrink justify-center items-center
    p-1 w-8 h-8 mr-3 rounded-sm;
}

.thumbIsImage {
  @apply bg-grey-lightest;
}

.thumbIsIcon {
  @apply text-grey bg-grey-darker;
}

.image {
  @apply block max-w-full max-h-full;
}

.label {
  @apply truncate;
}
</style>
