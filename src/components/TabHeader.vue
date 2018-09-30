<template>
  <div>
    <div>
      {{ activeTab.title }}
    </div>
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
