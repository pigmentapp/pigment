// eslint-disable-next-line no-underscore-dangle
declare const __static: string;

declare module '*.vue' {
  import Vue from 'vue';

  declare module 'vue/types/vue' {
    // eslint-disable-next-line no-shadow
    interface Vue {
      $productInfo: {
        name: string;
        productName: string;
        version: string;
      };
    }
  }

  export default Vue;
}
