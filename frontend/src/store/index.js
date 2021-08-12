import Vue from 'vue';
import Vuex from 'vuex';
import cities from './modules/cities';
import user from './modules/user';
import weather from './modules/weather';
import group from './modules/group';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      cities,
      user,
      weather,
      group
    }
  });