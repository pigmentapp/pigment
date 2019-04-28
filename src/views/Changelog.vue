<template>
  <app-content>
    <title-bar :back-button="true">
      <title-bar-text>
        Changelog
      </title-bar-text>
    </title-bar>
    <div
      :class="$style.changelog"
      v-html="$options.changelog"
    />
  </app-content>
</template>

<script>
import striptags from 'striptags';
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';
import file from 'html-loader!markdown-loader!@/../CHANGELOG.md'; // eslint-disable-line import/no-webpack-loader-syntax

let cleanFile = striptags(file, ['h1', 'h3', 'ul', 'li', 'strong']);
cleanFile = cleanFile.replace(/\([0-9a-z]*\)/g, '');

export default {
  changelog: cleanFile,
  components: {
    TitleBar,
    TitleBarText,
  },
};
</script>

<style lang="postcss" module>
.changelog {
  @apply p-6 mx-auto leading-normal;
  max-width: 600px;
}

.changelog a {
  color: inherit;
}

.changelog h1 {
  @apply text-3xl font-light leading-none;
}

.changelog h1:not(:first-child) {
  @apply mt-10;
}

.changelog h3 {
  @apply text-lg mt-6 font-light leading-none;
}

.changelog ul {
  @apply mt-2 text-grey-lighter list-reset;
}

.changelog strong {
  @apply text-grey font-light;
}

</style>
