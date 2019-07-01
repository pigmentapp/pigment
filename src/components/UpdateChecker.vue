<template>
  <app-content-section v-if="newVersionAvailable">
    <div :class="$style.versionAlert">
      <app-heading>
        Update Available
      </app-heading>
      <div>
        <app-button
          :href="downloadLink"
          tag="a"
        >
          Download {{ $productInfo.productName }} {{ latestRelease.tag_name }}
        </app-button>
      </div>
      <div :class="$style.versionLink">
        <a
          href="https://getpigment.app/download/"
          target="_blank"
        >
          Go to download page
        </a>
        &middot;
        <a
          :href="latestRelease.html_url"
          target="_blank"
        >
          Show release on GitHub
        </a>
      </div>
    </div>
  </app-content-section>
</template>

<script>
import semver from 'semver';

export default {
  data() {
    return {
      latestRelease: {},
    };
  },
  computed: {
    downloadLink() {
      const release = this.latestRelease;
      let asset;
      if (!release.assets) return asset;

      if (process.platform === 'darwin') {
        asset = release.assets.find(a => a.browser_download_url.indexOf('.dmg') > -1);
      }

      if (process.platform === 'win32') {
        asset = release.assets.find(a => a.browser_download_url.indexOf('.exe') > -1);
      }

      return asset.browser_download_url || asset;
    },
    newVersionAvailable() {
      const latestTag = this.latestRelease.tag_name;
      if (!latestTag) return false;

      const newVersion = semver.gt(latestTag, this.$productInfo.version);
      return newVersion && this.downloadLink;
    },
  },
  created() {
    this.getLatestRelease();
  },
  methods: {
    async getLatestRelease() {
      const url = 'https://api.github.com/repos/pigmentapp/pigment/releases/latest';
      const release = await (await fetch(url)).json();

      this.latestRelease = release;
    },
  },
};
</script>

<style lang="postcss" module>
.versionAlert {
  @apply p-4 text-teal-200 text-center bg-teal-600 rounded;
}

.versionLink {
  @apply mt-3;
}
</style>
