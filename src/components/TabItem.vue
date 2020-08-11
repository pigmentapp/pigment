<template>
  <tab-item-browser-view
    :item="item"
    #default="{
      canGoBack,
      canGoForward,
      executeMethod,
    }"
  >
    <tab-item-header
      :item="item"
      :can-go-back="canGoBack"
      :can-go-forward="canGoForward"
      @execute="(e) => executeMethod(e)"
    />
  </tab-item-browser-view>
</template>

<script>
import TabItemHeader from '@/components/TabItemHeader.vue';
import TabItemBrowserView from '@/components/TabItemBrowserView.vue';

export default {
  components: {
    TabItemHeader,
    TabItemBrowserView,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
