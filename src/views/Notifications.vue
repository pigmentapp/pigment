<template>
  <div class="p-4">
    <div
      v-for="notification in notifications"
      :key="notification.ident"
      class="p-2 mb-2 bg-grey-darkest rounded"
    >
      <div class="flex justify-between mb-1">
        <div class="font-bold">{{ notification.title }}</div>
        <div>{{ new Date(notification.timestamp).toLocaleString() }}</div>
      </div>
      <div>{{ notification.options.body }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    notifications() {
      return [...this.$store.getters['Notifications/list']].reverse();
    },
  },
};
</script>
