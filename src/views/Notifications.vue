<template>
  <app-content :class="$style.wrap">
    <title-bar :back-button="true">
      <title-bar-text>
        Notifications
      </title-bar-text>
      <title-bar-button
        v-if="notifications.length"
        @click="removeAll"
      >
        Clear all
      </title-bar-button>
    </title-bar>
    <template v-if="notifications.length">
      <div
        v-for="item in notifications"
        :key="item.timestamp"
        :class="$style.item"
        @click="$router.push({ name: 'tabs', params: { id: item.tabId }})"
      >
        <div :class="$style.thumb">
          <img
            v-if="item.notification.options && item.notification.options.icon"
            :class="$style.image"
            :src="item.notification.options.icon"
          >
          <app-icon
            v-else
            face="tab"
          />
        </div>
        <div :class="$style.body">
          <div :class="$style.bodyHeader">
            <div :class="$style.itemTitle">{{ item.notification.title }}</div>
            <div :class="$style.itemTime">{{ new Date(item.timestamp).toLocaleString() }}</div>
            <div>
              <app-button
                schema="secondary"
                @click.stop="removeItem(item)"
              >
                &times;
              </app-button>
            </div>
          </div>
          <div
            v-if="item.notification.options"
            :class="$style.content"
          >
            {{ item.notification.options.body }}
          </div>
        </div>
      </div>
    </template>
    <div
      v-else
      :class="$style.empty"
    >
      No notifications available.
    </div>
  </app-content>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import TitleBarButton from '@/components/TitleBarButton.vue';
import TitleBarText from '@/components/TitleBarText.vue';

export default {
  components: {
    TitleBar,
    TitleBarButton,
    TitleBarText,
  },
  computed: {
    notifications() {
      return this.$store.getters['Notifications/list']();
    },
  },
  methods: {
    removeAll() {
      this.$store.commit('Notifications/removeAll');
    },
    removeItem(item) {
      this.$store.commit('Notifications/removeItem', item);
    },
  },
};
</script>

<style lang="postcss" module>
.wrap {
  @apply p-2;
}

.header {
  @apply flex;
}

.title {
  @apply flex-grow mb-4 font-light text-3xl;
}

.item {
  @apply flex p-2 mb-2 bg-gray-900 rounded;
}

.itemTitle {
  @apply flex-grow font-bold;
}

.itemTime {
  @apply mx-2 text-gray-600;
}

.thumb {
  @apply
    flex flex-shrink-0 justify-center items-center
    p-1 w-8 h-8 mr-3 rounded-sm
    bg-gray-100;
}

.image {
  @apply block max-w-full max-h-full;
}

.body {
  @apply flex-grow;
}

.bodyHeader {
  @apply flex mb-1;
}

.content {
  @apply mt-2 text-gray-500;
}

.empty {
  @apply p-4 mb-2 bg-gray-900 rounded;
}
</style>
