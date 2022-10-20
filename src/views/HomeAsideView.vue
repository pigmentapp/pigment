<template>
  <div :class="$style.root">
    <notifications-list />
    <update-checker />
    <div>
      <router-link
        :to="{ name: 'settings' }"
        :class="$style.link"
      >
        <app-icon
          :size="6"
          face="Cog"
        />
        <div :class="$style.linkLabel">
          Settings
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NotificationsList from '@/components/NotificationsList.vue';
import UpdateChecker from '@/components/UpdateChecker.vue';

export default Vue.extend({
  components: {
    NotificationsList,
    UpdateChecker,
  },
});
</script>

<style lang="postcss" module>
.root {
  @apply flex flex-col flex-shrink-0 w-64 bg-gray-900 bg-opacity-50;
}

.link {
  @apply flex p-4 no-underline text-gray-600
    border-t border-gray-900 bg-gray-900 bg-opacity-50;
}

.linkLabel {
  @apply flex-grow pl-2;
}
</style>
