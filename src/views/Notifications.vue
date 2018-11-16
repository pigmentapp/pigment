<template>
  <div class="p-4">
    <div
      v-for="item in notifications"
      :key="item.timestamp"
      class="p-2 mb-2 bg-black rounded"
    >
      <div class="flex justify-between mb-1">
        <div class="font-bold">{{ item.notification.title }}</div>
        <div>{{ new Date(item.timestamp).toLocaleString() }}</div>
      </div>
      <div>{{ item.notification.options.body }}</div>
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
