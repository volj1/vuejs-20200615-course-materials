import meetups from '/data/meetups-data.js';
import { MeetupsList } from './MeetupsList.js';
import { MeetupsCalendar } from './MeetupsCalendar.js';
import { PageTabs}  from './PageTabs.js';
import { FormCheck } from './FormCheck.js';
import { AppEmpty } from './AppEmpty.js';

const template = `
<div class="container">

  <div class="filters-panel">
    <div class="filters-panel__col">
      <form-check :options="dateFilterOptions" v-model="filter.date"></form-check>
    </div>

    <div class="filters-panel__col">
      <div class="form-group form-group_inline">
        <div class="input-group input-group_icon input-group_icon-left">
          <img class="icon" alt="icon" src="/assets/icons/icon-search.svg"/>
          <input
            id="filters-panel__search"
            class="form-control form-control_rounded form-control_sm"
            type="text"
            placeholder="Поиск"
            v-model="filter.search"
          />
        </div>
      </div>
      <div class="form-group form-group_inline">
        <page-tabs :selected.sync="filter.view"></page-tabs>
      </div>
    </div>
  </div>


  <transition v-if="filteredMeetups && filteredMeetups.length" name="fade" mode="out-in">
    <meetups-list v-if="filter.view === '' || filter.view === 'list'" :meetups="filteredMeetups" key="list"></meetups-list>
    <meetups-calendar v-else-if="filter.view === 'calendar'" key="calendar"></meetups-calendar>
  </transition>
  <app-empty v-else>Митапов по заданным условям не найдено...</app-empty>
</div>
`;

export const MeetupsPage = {
  template,

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    FormCheck,
    AppEmpty,
  },

  data(){
    return {
      meetups: [],
      filter: {
        date: '',
        participation: '',
        search: '',
        view: '',
      },
      dateFilterOptions: [
        { text: 'Все', value: '' },
        { text: 'Прошедшие', value: 'past' },
        { text: 'Ожидаемые', value: 'future' },
      ],
    };
  },

  async mounted() {
    this.meetups = await this.fetchMeetups();
  },

  computed: {
    processedMeetups() {
      return this.meetups.map((meetup) => ({
        ...meetup,
        cover: meetup.imageId ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}` : undefined,
        date: new Date(meetup.date),
        localeDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }));
    },

    filteredMeetups() {
      let filteredMeetups = this.processedMeetups;

      if (this.filter.date === 'past') {
        filteredMeetups = filteredMeetups.filter((meetup) => new Date(meetup.date) <= new Date());
      } else if (this.filter.date === 'future') {
        filteredMeetups = filteredMeetups.filter((meetup) => new Date(meetup.date) > new Date());
      }

      if (this.filter.participation === 'organizing') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.organizing);
      } else if (this.filter.participation === 'attending') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.attending);
      }

      if (this.filter.search) {
        const concatMeetupText = (meetup) =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer].join(' ').toLowerCase();
        filteredMeetups = filteredMeetups.filter((meetup) =>
          concatMeetupText(meetup).includes(this.filter.search.toLowerCase()),
        );
      }

      return filteredMeetups;
    },
  },

  methods: {
    async fetchMeetups() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(meetups);
        }, 100);
      });
    },
  },

};
