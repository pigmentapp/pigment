<template>
  <div :class="$style.root">
    <div :class="$style.header">
      <h2 :class="$style.title">
        Notifications
        <small>({{ notifications.length }})</small>
      </h2>
      <button
        v-if="notifications.length"
        :class="$style.remove"
        title="Discard all notifications"
        type="button"
        @click="removeAll"
      >
        Discard all
      </button>
    </div>

    <div
      v-if="notifications.length"
      :class="$style.list"
    >
      <notifications-item
        v-for="item in notifications"
        :key="item.timestamp"
        :item="item"
      />
    </div>
    <div
      v-else
      :class="$style.empty"
    >
      <app-icon
        :size="8"
        face="Bell"
      />
      Pretty empty, huh?<br>
      This area will fill up with various notifications.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NotificationsItem from '@/components/NotificationsItem.vue';
import { TabNotification } from '@/types';

export default Vue.extend({
  components: {
    NotificationsItem,
  },
  computed: {
    notifications(): TabNotification[] {
      return this.$store.getters['Notifications/list']();
    },
  },
  methods: {
    removeAll() {
      if (!window.confirm('Do you really want to discard all notifications?')) return; // eslint-disable-line no-alert
      this.$store.commit('Notifications/removeAll');
    },
  },
});
</script>

<style lang="postcss" module>
.root {
  @apply flex flex-col flex-grow min-h-0;
}

.header {
  @apply flex items-baseline p-2;
}

.title {
  @apply flex-grow font-medium;
}

.title small {
  @apply font-normal text-gray-600;
}

.remove {
  @apply text-sm text-gray-600;
}

.list {
  @apply min-h-0 p-2 overflow-y-auto border-t border-gray-900;
}

.empty {
  @apply p-2 my-auto text-gray-700 text-center;
}
</style>
