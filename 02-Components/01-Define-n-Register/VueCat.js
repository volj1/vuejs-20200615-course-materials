export default {
  template: '<img :src="`https://cataas.com/cat?width=${width}&random=${random}`" alt="Random cat">',
  data() {
    return {
      width: 300,
      random: Math.random(),
    };
  },
};
