<template>
  <div :class="$style.wrap">
    <button
      v-for="app in apps"
      :key="app.url"
      :class="$style.btn"
      :title="`Add '${app.label}' to ${$productInfo.productName}`"
      @click="createTab(app)"
    >
      <div :class="$style.thumb">
        <img
          :class="$style.img"
          :src="favicon(app)"
          :alt="app.label"
        >
      </div>
      <div :class="$style.label">
        {{ app.label }}
      </div>
    </button>
    <router-link
      v-if="showCreateBtn"
      :class="$style.btn"
      :to="{
        name: 'tabs-create',
      }"
      title="Create a custom tab"
    >
      <div :class="$style.thumb">
        <app-icon
          :size="8"
          face="TabPlus"
        />
      </div>
      <div :class="$style.label">
        Custom
      </div>
    </router-link>
  </div>
</template>

<script>
import shuffleArray from 'shuffle-array';
import apps from '@/data/recommended-apps.json';

export default {
  props: {
    goToCreatedTab: {
      type: Boolean,
      default: false,
    },
    showCreateBtn: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    existingTabs() {
      return this.$store.getters['Tabs/list'];
    },
    apps() {
      const existing = this.existingTabs;
      const filtered = apps
        .filter(app => !existing.some(e => e.url.includes(new URL(app.url).host)));
      return shuffleArray(filtered);
    },
  },
  methods: {
    async createTab({ label, url }) {
      const tab = await this.$store.dispatch('Tabs/create', { label, url });

      if (!this.goToCreatedTab) return;

      this.$router.push({
        name: 'tabs',
        params: {
          id: tab.id,
        },
      });
    },
    favicon({ url }) {
      return `https://icons.duckduckgo.com/ip3/${new URL(url).host}.ico`;
    },
  },
};
</script>

<style lang="postcss" module>
.wrap {
  @apply p-8 pb-6 bg-gray-900 rounded;
  display: grid;
  grid-column-gap: theme('padding.8');
  grid-row-gap: theme('padding.4');
  grid-template-columns: repeat(auto-fill, minmax(theme('width.24'), 1fr));
}

.btn {
  @apply
    relative mb-8
    text-center bg-gray-700 rounded shadow-lg;
}

.btn::before {
  @apply block;
  padding-top: 100%;
  content: "";
}

.btn:hover::after {
  @apply
    absolute inset-0 flex flex-col justify-center
    text-4xl text-white leading-none
    opacity-75 bg-gray-700 rounded;
  content: "+";
}

.thumb {
  @apply
    absolute block p-3
    text-4xl text-gray-700 leading-none
    bg-gray-100 rounded-full shadow;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.img {
  @apply block w-8 h-8 max-w-5xl;
}

.label {
  @apply
    absolute pt-2 min-w-0
    text-center text-gray-600 truncate;
  top: 100%;
  left: 0;
  right: 0;
}
</style>
