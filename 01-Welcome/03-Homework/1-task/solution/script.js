import Vue from '/vendor/vue.esm.browser.js';

export const app = new Vue({
  el: '#app',

  data: {
    count: 0,
  },

  methods: {
    increment() {
      this.count++;
    },
  },
});
