import { MeetupListItem } from './MeetupsListItem.js';

const template = `
<div class="meetups-list transition-list">
  <transition-group name="transition-list">
    <meetup-list-item v-for="meetup in meetups" :meetup="meetup" :key="meetup.id"></meetup-list-item>
  </transition-group>
</div>
`;

export const MeetupsList = {
  template,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    MeetupListItem,
  },
};
