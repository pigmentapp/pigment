<template>
  <tab-item-browser-view
    #default="{ executeMethod }"
    :item="item"
  >
    <tab-item-header
      :item="item"
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
