<template>
  <app-content>
    <title-bar>
      <title-bar-text>
        Welcome to {{ $productInfo.productName }}
      </title-bar-text>
    </title-bar>

    <app-content-section :class="$style.brandWrap">
      <img
        :class="$style.brandLogo"
        :alt="$productInfo.productName"
        src="@/assets/logo/logo.png"
      >
      <app-heading :class="$style.brandLabel">
        {{ $productInfo.productName }}
        <template slot="sub">
          {{ $productInfo.version }}
        </template>
      </app-heading>
    </app-content-section>

    <app-content-section v-if="newVersionAvailable">
      <div :class="$style.versionAlert">
        <app-heading>
          Update Available
        </app-heading>
        <div>
          <app-button
            @click="$electron.remote.shell.openExternal(latestRelease.html_url)"
          >
            Download {{ $productInfo.productName }} {{ latestRelease.tag_name }}
          </app-button>
        </div>
      </div>
    </app-content-section>

    <app-content-section>
      <app-heading>
        Get started
        <template slot="sub">
          Maybe some of these suggested apps are interesting for you.
          Just click on the icons of apps you like,
          to add them to {{ $productInfo.productName }}.
          Or create a custom tab by clicking on the
          <app-icon
            face="tab-plus"
            inline
          />-Button
          down below in the navigation.
        </template>
      </app-heading>
      <suggested-apps />
    </app-content-section>
  </app-content>
</template>

<script>
import semver from 'semver';
import SuggestedApps from '@/components/SuggestedApps.vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  components: {
    SuggestedApps,
    TitleBar,
    TitleBarText,
  },
  data() {
    return {
      latestRelease: {},
    };
  },
  computed: {
    newVersionAvailable() {
      if (!this.latestRelease.tag_name) return false;
      return semver.gt(this.latestRelease.tag_name, this.$productInfo.version);
    },
  },
  created() {
    this.getLatestRelease();
  },
  methods: {
    async getLatestRelease() {
      const response = await fetch('https://api.github.com/repos/pigmentapp/pigment/releases/latest');
      const release = await response.json();

      this.latestRelease = release;
    },
  },
};
</script>

<style lang="postcss" module>
.brandWrap {
  @apply flex items-center pb-8 border-b-2 border-gray-700;
}

.brandLogo {
  @apply block p-3 mr-4 w-16 h-16 bg-gray-300 rounded-full;
}

.brandLabel {
  @apply mb-0;
}

.versionAlert {
  @apply p-4 text-green-200 text-center bg-green-600 rounded;
}
</style>
