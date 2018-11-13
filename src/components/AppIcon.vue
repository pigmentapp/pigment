<template>
  <svg
    v-if="content"
    :viewBox="attributes.viewBox"
    :class="['inline-flex', `w-${size}`, `h-${size}`, 'fill-current']"
    v-html="content"
  />
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      content: null,
      attributes: {},
    };
  },
  watch: {
    '$slots.default': {
      immediate: true,
      handler(slot) {
        if (!slot.length) return;

        import(`!svg-loader!@/assets/icons/${slot[0].text}.svg`).then((res) => {
          this.content = res.content;
          this.attributes = res.attributes;
        });
      },
    },
  },
};
</script>

<style>

</style>
