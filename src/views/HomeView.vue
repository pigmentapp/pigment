<template>
  <app-content :class="$style.root">
    <title-bar back-button>
      <title-bar-text>
        {{ $productInfo.productName }}
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

    <app-content-section :class="$style.alert">
      Thank you for using Pigment!
      Due to lack of time and interest the project is no longer maintained.
      Using Pigment in the future is not recommended -
      the underlying Chromium browser version is outdated.
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
            face="TabPlus"
            inline
          />-Button
          down below in the navigation.
        </template>
      </app-heading>
      <suggested-apps show-create-btn />
    </app-content-section>

    <app-content-section>
      <app-heading>
        What's new?
        <template slot="sub">
          Here you find the latest release notes.
          <a
            href="//github.com/pigmentapp/pigment/releases"
            target="_blank"
          >
            Read more on GitHub
          </a>
        </template>
      </app-heading>
      <release-notes />
    </app-content-section>
  </app-content>
</template>

<script lang="ts">
import Vue from 'vue';
import ReleaseNotes from '@/components/ReleaseNotes.vue';
import SuggestedApps from '@/components/SuggestedApps.vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default Vue.extend({
  components: {
    ReleaseNotes,
    SuggestedApps,
    TitleBar,
    TitleBarText,
  },
});
</script>

<style lang="postcss" module>
.alert {
  @apply bg-yellow-400 text-yellow-900 p-4 rounded font-medium;
}

.root {
  @apply overflow-y-auto;
}

.brandWrap {
  @apply flex items-center pb-8 border-b-2 border-gray-700;
}

.brandLogo {
  @apply block p-3 mr-4 w-16 h-16 bg-gray-300 rounded-full;
}

.brandLabel {
  @apply mb-0;
}
</style>
