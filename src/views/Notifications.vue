<template>
  <div class="p-8">
    <div class="flex">
      <div class="flex-grow mb-4 font-light text-3xl">
        Notifications
      </div>
      <button
        type="button"
        class="text-grey-dark"
        @click="removeAll"
      >
        Clear all
      </button>
    </div>
    <template v-if="notifications.length">
      <div
        v-for="item in notifications"
        :key="item.timestamp"
        class="p-2 mb-2 bg-black rounded"
      >
        <div class="flex mb-1">
          <div class="flex-grow font-bold">{{ item.notification.title }}</div>
          <div class="mx-2">{{ new Date(item.timestamp).toLocaleString() }}</div>
          <button
            type="button"
            class="text-grey-dark"
            @click="removeItem(item)"
          >
            &times;
          </button>
        </div>
        <div>{{ item.notification.options.body }}</div>
      </div>
    </template>
    <div
      v-else
      class="p-2 mb-2 bg-black rounded"
    >
      No notifications available.
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters['Notifications/list']();
    },
  },
  methods: {
    removeAll() {
      this.$store.commit('Notifications/removeAll');
    },
    removeItem(item) {
      this.$store.commit('Notifications/removeItem', item);
    },
  },
};
</script>
