<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :class="$style.btn"
    :title="title && !showLabel ? title : undefined"
    :to="to"
    tag="button"
    v-on="$listeners"
  >
    <div :class="$style.icon">
      <app-icon
        :face="icon"
        :size="6"
      />
    </div>
    <div
      v-if="$slots.default && showLabel"
      :class="$style.label"
    >
      <slot />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    showLabel: {
      type: Boolean,
      required: true,
    },
    title: {
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
  @apply flex p-2 text-left;
}

.icon {
  @apply flex-shrink-0 px-2;
}

.label {
  @apply flex-grow pl-2 whitespace-no-wrap;
}
</style>
