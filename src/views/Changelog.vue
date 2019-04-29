<template>
  <app-content>
    <title-bar :back-button="true">
      <title-bar-text>
        Changelog
      </title-bar-text>
    </title-bar>
    <div
      :class="$style.changelog"
      v-html="changelog"
    />
  </app-content>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  components: {
    TitleBar,
    TitleBarText,
  },
  data() {
    return {
      changelog: '',
    };
  },
  created() {
    this.fetchChangelog();
  },
  methods: {
    async fetchChangelog() {
      const path = process.env.NODE_ENV === 'development'
        ? '/changelog.html'
        : `${process.env.BASE_URL}/changelog.html`;

      const response = await fetch(path);
      const contents = await response.text();

      this.changelog = contents;
    },
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
