<template>
  <component
    :is="to ? 'router-link' : tag"
    :to="to"
    :tag="tag"
    :type="tag === 'button' && 'button'"
    :disabled="disabled"
    :class="{
      [$style.btn]: true,
      [$style[schema]]: true,
      [$style.active]: active,
    }"
    v-on="$listeners"
  >
    <app-icon
      v-if="icon"
      :face="icon"
      :class="$style.icon"
    />
    <div
      v-if="$slots.default"
      :class="$style.label"
    >
      <slot />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    schema: {
      type: String,
      default: 'gray',
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
  @apply
    flex p-2
    leading-none appearance-none text-left text-gray-500 whitespace-no-wrap;
  -webkit-app-region: no-drag;
}

.btn[disabled] {
  @apply opacity-50 pointer-events-none;
}

.icon {
  @apply flex-shrink-0;
}

.icon + .label {
  @apply ml-2;
}

.label {
  @apply flex-grow;
}

.red:hover {
  @apply text-red-200 bg-red-600;
}

.gray:hover,
.active {
  @apply text-gray-300 bg-gray-700;
}
</style>
