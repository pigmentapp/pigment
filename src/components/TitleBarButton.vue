<template>
  <div :class="$style.wrap">
    <component
      :is="to ? 'router-link' : tag"
      :to="to"
      :tag="tag"
      :type="tag === 'button' && 'button'"
      :disabled="disabled"
      :class="{
        [$style.btn]: true,
        [$style[schema]]: true,
        [$style.active]: active || isDropdownActive,
      }"
      v-on="$listeners"
      @click="triggerClick($event)"
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
    <div
      v-if="$slots.dropdown"
      v-show="isDropdownActive"
      ref="dropdown"
      :class="$style.dropdown"
    >
      <div :class="$style.dropdown_shadow" />
      <slot name="dropdown" />
    </div>
  </div>
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
  data() {
    return {
      isDropdownActive: false,
    };
  },
  mounted() {
    if (this.$slots.dropdown) {
      this.$refs.dropdown.addEventListener('click', this.toggleDropdown);
    }
  },
  methods: {
    triggerClick(e) {
      this.$emit('click', e);

      if (this.$slots.dropdown) {
        this.toggleDropdown();
      }
    },
    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive;
    },
  },
};
</script>

<style lang="postcss" module>
.wrap {
  @apply relative;
}

.btn {
  @apply
    flex p-2 w-full
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

.dropdown {
  @apply
    absolute right-0 flex flex-col overflow-hidden
    bg-gray-700 rounded-b shadow-md;
}

.dropdown .btn {
  @apply text-gray-300;
}

.dropdown .btn:hover {
  @apply text-gray-400 bg-gray-800;
}

.dropdown_shadow {
  @apply fixed inset-0;
}
</style>
