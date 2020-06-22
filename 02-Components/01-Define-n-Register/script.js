import Vue from '/vendor/vue.esm.browser.js';

const VueCat = {
  template: '#cat-template',
  data() {
    return {
      width: 300,
      random: Math.random(),
    };
  },
}

const VueCatX = {
  template: '#cat-x-template',
  data() {
    return {
      width: 300,
      random: Math.random(),
    };
  },
}

const VueCat3 = {
  template: '<img :src="`https://cataas.com/cat?width=${width}&random=${random}`" alt="Random cat">',
  data() {
    return {
      width: 300,
      random: Math.random(),
    };
  },
}

Vue.component('vue-cat6', {
  template: '<img :src="`https://cataas.com/cat?width=${width}&random=${random}`" alt="Random cat">',
  data() {
    return {
      width: 300,
      random: Math.random(),
    };
  },
});

const VueCatProps = {
  template: '<img :src="`https://cataas.com/cat?width=${width}&random=${random}`" alt="Random cat">',

  // props: ['width'],

  // props: {
  //   width: Number,
  // },

  props: {
    width: {
      required: false,
      type: Number,
      default: 300,
      validator: (val) => (0 <= val && val <= 500),
    },
  },

  data() {
    return {
      random: Math.random(),
    };
  },

}

const app = new Vue({
  el: "#app",

  components: {
    VueCat,
    VueCat2: VueCatX,
    VueCat3,
    VueCat4: {
      template: '<img :src="`https://cataas.com/cat?width=${width}&random=${random}`" alt="Random cat">',

      data() {
        return {
          width: 300,
          random: Math.random(),
        };
      },
    },
    VueCat5: () => import('./VueCat.js'),
    VueCatProps,
  },

  data: {
    catsCount: 3,
  }
});
