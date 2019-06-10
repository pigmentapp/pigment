<template>
  <div :class="$style.wrap">
    <button
      v-for="app in apps"
      :key="app.url"
      :class="$style.btn"
      @click="createTab(app)"
    >
      <div :class="$style.thumb">
        <img
          :class="$style.img"
          :src="app.icon"
          :alt="app.label"
        >
      </div>
      <div :class="$style.label">
        {{ app.label }}
      </div>
    </button>
    <router-link
      :class="$style.btn"
      :to="{
        name: 'tabs-create',
      }"
    >
      <div :class="$style.thumb">
        <app-icon
          :size="8"
          face="tab-plus"
        />
      </div>
      <div :class="$style.label">
        Create
      </div>
    </router-link>
  </div>
</template>

<script>
import shuffleArray from 'shuffle-array';
import apps from '@/data/recommended-apps.json';

export default {
  computed: {
    existingTabs() {
      return this.$store.getters['Tabs/list'];
    },
    apps() {
      const existing = this.existingTabs;
      const filtered = apps.filter(app => !existing.some(e => e.url.includes(app.filter)));
      return shuffleArray(filtered);
    },
  },
  methods: {
    createTab({ label, url }) {
      this.$store.dispatch('Tabs/create', { label, url });
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
