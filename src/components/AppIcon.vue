<template>
  <svg
    v-if="content"
    :viewBox="attributes.viewBox"
    :class="['block', 'flex-no-shrink', `w-${size}`, `h-${size}`, 'mx-auto', 'fill-current']"
    v-html="content"
  />
</template>

<script>
export default {
  props: {
    face: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      content: null,
      attributes: {},
    };
  },
  watch: {
    face: {
      immediate: true,
      handler(icon) {
        if (!icon.length) {
          this.content = null;
          this.attributes = {};
          return;
        }

        import(`!svg-loader!@/assets/icons/${icon}.svg`).then((res) => {
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
