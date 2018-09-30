<template>
  <form
    @submit.prevent="submitPage"
  >
    <div class="mb-2">
      <input
        v-model="newTab.label"
        class="input"
        type="text"
        placeholder="Insert tab title"
      >
    </div>
    <div class="mb-2">
      <input
        v-model="newTab.url"
        class="input"
        type="url"
      >
    </div>
    <app-button>Submit</app-button>
  </form>
</template>

<script>
const newTabDefaults = {
  label: '',
  url: 'https://',
};

export default {
  data() {
    return {
      newTab: {
        ...newTabDefaults,
      },
    };
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

      this.newTab = {
        ...newTabDefaults,
      };

      this.$emit('submitted');
    },
  },
};
</script>

<style lang="postcss">
.input {
  @apply px-2 py-1 w-full;
  @apply text-grey-light leading-tight;
  @apply bg-transparent border border-grey-darker rounded-sm;
}
</style>
