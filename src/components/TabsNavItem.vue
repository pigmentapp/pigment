<template>
  <router-link
    :to="to"
    tag="button"
    class="flex items-center p-2 mx-1 mt-1 text-grey-dark text-left rounded-sm"
    active-class="text-grey-light bg-grey-darkest shadow"
  >
    <div
      :class="image ? 'bg-grey-lightest' : 'text-grey bg-grey-darker'"
      class="
        flex flex-no-shrink justify-center items-center
        p-1 w-8 h-8 mr-3 rounded-sm
      "
    >
      <img
        v-if="image"
        :src="image"
        class="block max-w-full max-h-full"
      >
      <app-icon
        v-else
        :face="icon"
      />
    </div>
    <div class="truncate">
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
