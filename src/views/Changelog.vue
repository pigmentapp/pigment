<template>
  <app-content :class="$style.notes">
    <title-bar :back-button="true">
      <title-bar-text>
        Release Notes
      </title-bar-text>
    </title-bar>

    <app-content-section
      v-for="release in matchingReleases"
      :key="release.id"
      :class="$style.item"
      v-html="mdToHtml(release.body)"
    />
    <app-content-section>
      <app-button
        :class="$style.more"
        secondary
        @click="$electron.remote.shell.openExternal('https://github.com/pigmentapp/pigment/releases')"
      >
        Read more on GitHub
      </app-button>
    </app-content-section>
  </app-content>
</template>

<script>
import marked from 'marked';
import semver from 'semver';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => `<a target="_blank" href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;

export default {
  components: {
    TitleBar,
    TitleBarText,
  },
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

      return this.releases.filter(release => semver.satisfies(release.name, versionRange));
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
        sanitize: true,
      });
    },
  },
};
</script>

<style lang="postcss" module>
.item {
  @apply p-6 text-gray-600 bg-gray-900 rounded shadow-lg leading-relaxed;
}

.notes a {
  @apply underline;
}

.notes h1 {
  @apply
    pb-6 border-b border-gray-800
    text-3xl text-gray-500 font-light leading-none;
}

.notes h2 {
  @apply
    pb-6 border-b border-gray-800
    text-2xl text-gray-500 font-light leading-none;
}

.notes h3 {
  @apply text-xl text-gray-500 mt-6 leading-none;
}

.notes ul {
  @apply mt-2 ml-8 list-disc tracking-wide;
}

.notes li {
  @apply mt-2;
}

.notes strong:first-child {
  @apply text-gray-500;
}

.more {
  @apply block w-auto mx-auto;
}
</style>
