<template>
  <div>
    <div
      v-for="tab in tabList"
      :key="tab.ident"
      @click="$store.commit('Tabs/activateIdent', tab.ident)"
    >
      <img
        :src="tab.favicon"
        width="24">
      {{ tab.label }}
    </div>

    <form
      action=""
      @submit.prevent="submitPage"
    >
      <p>
        <input
          v-model="newTab.label"
          type="text"
          placeholder="New Tab"
        >
      </p>
      <p>
        <input
          v-model="newTab.url"
          type="url"
        >
      </p>
      <button/>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTab: {
        label: '',
        url: '',
      },
    };
  },
  computed: {
    tabList() {
      return this.$store.getters['Tabs/list'];
    },
  },
  methods: {
    submitPage() {
      if (!this.newTab.url) return;

      if (!this.newTab.label) {
        this.newTab.label = 'New Tab';
      }

      this.$store.dispatch('Tabs/add', {
        label: this.newTab.label,
        url: this.newTab.url,
      });
    },
  },
};
</script>

<style>

</style>
