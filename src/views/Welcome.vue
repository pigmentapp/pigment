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

    <update-checker />

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
  </app-content>
</template>

<script>
import SuggestedApps from '@/components/SuggestedApps.vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';
import UpdateChecker from '@/components/UpdateChecker.vue';

export default {
  components: {
    SuggestedApps,
    TitleBar,
    TitleBarText,
    UpdateChecker,
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
</style>
