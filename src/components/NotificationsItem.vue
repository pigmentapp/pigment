<template>
  <router-link
    :class="$style.root"
    :to="{ name: 'tabs', params: { id: item.tabId } }"
  >
    <div :class="$style.thumb">
      <img
        v-if="notification.options && notification.options.icon && !hasBrokenImage"
        :class="$style.image"
        :src="notification.options.icon"
        @error="hasBrokenImage = true"
      >
      <app-icon
        v-else
        :size="5"
        face="Image"
      />
    </div>
    <div :class="$style.header">
      <div :class="$style.title">{{ notification.title }}</div>
      <div
        :class="$style.time"
        :title="new Date(item.timestamp).toLocaleString()"
        v-text="dateAgo"
      />
    </div>
    <div :class="$style.action">
      <button
        :class="$style.remove"
        title="Discard"
        type="button"
        @click.prevent="removeItem"
      >
        <app-icon face="Close" />
      </button>
    </div>
    <div
      v-if="notification.options"
      :class="$style.body"
      v-text="notification.options.body"
    />
  </router-link>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hasBrokenImage: false,
    };
  },
  computed: {
    dateAgo() {
      return formatDistanceToNow(
        this.item.timestamp,
        { addSuffix: true },
      );
    },
    notification() {
      return this.item.notification;
    },
  },
  methods: {
    removeItem() {
      this.$store.commit('Notifications/removeItem', this.item);
    },
  },
};
</script>


<style lang="postcss" module>
.root {
  grid-template-columns: min-content minmax(0, 1fr) min-content;
  grid-template-areas:
    "image header action"
    "body  body   body"
  ;

  @apply grid gap-1 p-2 text-xs bg-gray-900 no-underline;
}

.root + .root {
  @apply mt-px;
}

.root:first-child {
  @apply rounded-t;
}

.root:last-child {
  @apply rounded-b;
}

.root:focus,
.root:hover {
  @apply bg-gray-800;
}

.header {
  grid-area: header;
  @apply leading-snug;
}

.title {
  @apply font-medium truncate;
}

.time {
  @apply text-gray-600;
}

.thumb {
  grid-area: image;
  @apply
    flex justify-center items-center
    mr-1 w-8 h-8 overflow-hidden text-gray-600 bg-gray-300 rounded-full shadow;
}

.image {
  @apply object-cover;
}

.action {
  grid-area: action;
  @apply flex items-center;
}

.remove {
  @apply p-1 rounded-full text-gray-700;
}

.remove:hover,
.remove:focus {
  @apply bg-gray-700 text-gray-400;
}

.body {
  grid-area: body;
  @apply leading-snug text-gray-500 break-words;
}
</style>
