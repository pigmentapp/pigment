<template>
  <router-link
    :to="{ name: 'tabs', params: { ident: item.ident } }"
    :class="$style.item"
    :active-class="$style.active"
    tag="button"
  >
    <div
      :class="{
        [$style.thumb]: true,
        [$style.thumbIsImage]: pageState.favicon,
        [$style.thumbIsIcon]: !pageState.favicon,
      }"
    >
      <img
        v-if="pageState.favicon"
        :src="pageState.favicon"
        :class="$style.image"
      >
      <app-icon
        v-else
        face="tab"
      />
    </div>
    <div :class="$style.label">
      {{ item.label }}
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    pageState() {
      return this.$store.getters['Pages/state'](this.item.ident);
    },
  },
};
</script>

<style lang="postcss" module>
.item {
  @apply
    flex flex-no-shrink items-center p-2
    text-grey-dark text-left rounded-sm;
}

.item + .item {
  @apply mt-1;
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
