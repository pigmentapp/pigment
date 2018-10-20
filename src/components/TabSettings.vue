<template>
  <form
    class="flex flex-grow items-center justify-center"
    @submit.prevent="saveSettings"
  >
    <div>
      <label class="block mb-4">
        <div class="mb-1">Label</div>
        <input
          v-model="tab.label"
          class="input"
          type="text"
          placeholder="Insert tab title"
        >
      </label>
      <label class="block mb-4">
        <div class="mb-1">URL</div>
        <input
          v-model="tab.url"
          class="input"
          type="url"
        >
      </label>
      <app-button>Submit</app-button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tab: {},
    };
  },
  watch: {
    item: {
      immediate: true,
      handler(value) {
        this.tab = { ...value };

        if (!this.tab.url) {
          this.tab.url = 'https://';
        }
      },
    },
  },
  methods: {
    saveSettings() {
      if (!this.tab.url) return;

      this.$store.commit('Tabs/update', {
        ident: this.item.ident,
        data: {
          label: this.tab.label,
          url: this.tab.url,
        },
      });

      this.$emit('submitted');
    },
  },
};
</script>

<style lang="postcss" scoped>
label {
  min-width: 33vw;
}
.input {
  @apply px-2 py-1 w-full;
  @apply text-grey-light leading-tight;
  @apply bg-transparent border border-grey-darker rounded-sm;
}
</style>
