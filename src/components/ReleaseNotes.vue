<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <app-content-section
      v-for="release in matchingReleases"
      :key="release.id"
      :class="$style.item"
      v-html="mdToHtml(release.body)"
    />
  </div>
</template>

<script>
import { marked } from 'marked';
import semver from 'semver';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => `<a target="_blank" href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;

export default {
  data() {
    return {
      releases: [],
    };
  },
  computed: {
    matchingReleases() {
      if (!this.releases.length) return [];

      const currentVersion = process.env.NODE_ENV === 'development'
        ? this.releases[0].name
        : this.$productInfo.version;

      let vWithoutPatch = currentVersion.split('.');
      vWithoutPatch.pop();
      vWithoutPatch = vWithoutPatch.join('.');

      const versionRange = `${vWithoutPatch} - ${currentVersion}`;

      return this.releases.filter((release) => semver.satisfies(release.name, versionRange));
    },
  },
  created() {
    this.getReleases();
  },
  methods: {
    async getReleases() {
      const url = 'https://api.github.com/repos/pigmentapp/pigment/releases';
      this.releases = await (await fetch(url)).json();
    },
    mdToHtml(val) {
      return marked(val, {
        headerIds: false,
        renderer,
      });
    },
  },
};
</script>

<style lang="postcss" module>
.item {
  @apply p-6 text-gray-600 bg-gray-900 rounded shadow-lg leading-relaxed;
}

.item h1 {
  @apply
    pb-6 border-b border-gray-800
    text-3xl text-gray-500 font-light leading-none;
}

.item h2 {
  @apply
    pb-6 border-b border-gray-800
    text-2xl text-gray-500 font-light leading-none;
}

.item h3 {
  @apply text-xl text-gray-500 mt-6 leading-none;
}

.item ul {
  @apply mt-2 ml-8 list-disc tracking-wide;
}

.item li {
  @apply mt-2;
}

.item strong:first-child {
  @apply text-gray-500;
}
</style>
