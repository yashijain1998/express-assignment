import axios from "axios";

const weather = {
  namespaced: true,
  state: {
    cityWeather: [],
  },
  getters: {
      weatherDetail: (state) => (city) => {
          return state.cityWeather.find(el => { return el.name == city });
      }
  },
  actions: {
    getWeather({ commit }, payload) {
        let url ="http://localhost:7000/users";
        return axios.get(url + `/${payload.uname}/groups/${payload.region}/${payload.city}`)
        .then((response) => {
            commit('saveWeather',response);
        })
        .catch(() => {
            console.log('Error while fetching weather.');
        });
    }
  },
  mutations: {
      saveWeather: (state, response) => {
        state.cityWeather.push(response.data);
        
      },
  }
};

export default weather;
