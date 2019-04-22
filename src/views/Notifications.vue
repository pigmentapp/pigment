<template>
  <app-content :class="$style.wrap">
    <div :class="$style.header">
      <div :class="$style.title">
        Notifications
      </div>
      <div>
        <app-button
          schema="secondary"
          @click="removeAll"
        >
          Clear all
        </app-button>
      </div>
    </div>
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
export default {
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
  @apply p-8;
}

.header {
  @apply flex;
}

.title {
  @apply flex-grow mb-4 font-light text-3xl;
}

.item {
  @apply flex p-2 mb-2 bg-grey-darkest rounded;
}

.itemTitle {
  @apply flex-grow font-bold;
}

.itemTime {
  @apply mx-2 text-grey-dark;
}

.thumb {
  @apply
    flex flex-no-shrink justify-center items-center
    p-1 w-8 h-8 mr-3 rounded-sm
    bg-grey-lightest;
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
  @apply mt-2 text-grey;
}

.empty {
  @apply p-2 mb-2 bg-black rounded;
}
</style>
