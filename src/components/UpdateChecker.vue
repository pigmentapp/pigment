<template>
  <div
    v-if="newVersionAvailable"
    :class="$style.root"
  >
    <div :class="$style.message">
      <app-icon
        :size="6"
        face="PartyPopper"
      />
      <div :class="$style.body">
        <h3 :class="$style.title">
          Update available
        </h3>
        <div :class="$style.links">
          <a
            href="https://getpigment.app/download/"
            target="_blank"
          >Go to download page</a>
          <br>
          <a
            :href="latestRelease.html_url"
            target="_blank"
          >Show release on GitHub</a>
        </div>
      </div>
    </div>

    <app-button
      :class="$style.button"
      :href="downloadLink"
      tag="a"
    >
      Download {{ latestRelease.tag_name }}
    </app-button>
  </div>
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
.root {
  @apply p-4 text-teal-200 bg-teal-600;
}

.message {
  @apply flex mb-4;
}

.body {
  @apply flex-grow ml-4;
}

.title {
  @apply font-medium text-teal-100;
}

.links {
  @apply mt-0 text-xs;
}
</style>
