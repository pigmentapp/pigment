<template>
  <div
    v-if="Object.keys(updateInfo).length"
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
        </div>
      </div>
    </div>

    <app-button
      v-if="$options.isWin"
      :class="$style.button"
      :disabled="isInstalling"
      @click="downloadAndInstall"
    >
      <app-icon
        v-if="isInstalling"
        :size="5"
        face="Loading"
        spin
      />
      <div v-else>
        Install {{ updateInfo.version }}
      </div>
    </app-button>
    <app-button
      v-else
      :class="$style.button"
      href="https://getpigment.app/download"
      target="_blank"
      tag="a"
    >
      Download {{ updateInfo.version }}
    </app-button>
  </div>
</template>

<script>
import { remote } from 'electron';

export default {
  isWin: process.platform === 'win32',
  data() {
    return {
      latestRelease: {},
      isInstalling: false,
      downloadProgress: {},
    };
  },
  computed: {
    updateInfo() {
      return this.$store.state.updateInfo;
    },
  },
  created() {
    remote.app.on('app-update-error', (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      this.isInstalling = false;
    });

    remote.app.on('app-update-download-progress', (info) => {
      // eslint-disable-next-line no-console
      console.info(info);
      this.downloadProgress = info;
    });
  },
  methods: {
    downloadAndInstall() {
      this.isInstalling = true;
      remote.app.emit('app-update-start-download');
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
