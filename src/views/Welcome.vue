<template>
  <app-content :class="$style.wrap">
    <title-bar>
      <title-bar-text>
        Pigment
      </title-bar-text>
    </title-bar>
    <div :class="$style.content">
      <div :class="$style.title">Welcome to Pigment</div>
    </div>
    <div :class="$style.content">
      <div :class="$style.title">Get started with these suggested apps</div>
      <p>
        Maybe some of these apps are interesting for you.
        Just click on the icons of apps you like, to add them to Pigment.
        Or create a custom tab by clicking on the "+"-Button
        down below in the navigation.
      </p>
    </div>
    <suggested-apps />
  </app-content>
</template>

<script>
import SuggestedApps from '@/components/SuggestedApps.vue';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  components: {
    SuggestedApps,
    TitleBar,
    TitleBarText,
  },

};
</script>


<style lang="postcss" module>
.wrap {
  @apply p-8;
}

.content {
  @apply mb-8;
}

.title {
  @apply mb-2 font-light text-3xl;
}
</style>
