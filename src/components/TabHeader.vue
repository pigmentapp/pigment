<template>
  <div class="py-2">
    {{ activeTab.title }}
  </div>
</template>

<script>
export default {
  computed: {
    activeTab() {
      return this.$store.getters['Tabs/active'];
    },
  },
};
</script>

<style>

</style>
