import axios from "axios";

const cities = {
  namespaced: true,
  state: {
    cities: [],
  },
  getters: {
      cityDetail: (state) => {
          return state.cities;
      }
  },
  actions: {
    getCity({ commit }, payload) {
        let url ="http://localhost:7000/users";
        return axios.get(url + `/${payload.uname}/groups/${payload.region}`)
        .then((response) => {
            commit('setCity',response.data);
        })
        // .catch(() => {
        //     console.log('Error while fetching cities.');
        // });
    },
    addCity({ commit }, payload) {
      let url ="http://localhost:7000/users";
      return axios.post( url + `/${payload.uname}/groups/${payload.region}` ,{
        city: payload.newCity
      })
      .then((response) => {
        commit('setCity',response.data.group);
      })
    },
    deleteCity({ commit }, payload) {
      let url ="http://localhost:7000/users";
      return axios.delete(url + `/${payload.uname}/groups/${payload.region}/${payload.city}`)
      .then((response) => {
        commit('setCity',response.data);
      })
    }

  },
  mutations: {
      setCity: (state, response) => {
        state.cities = response;
      },
      // addCity: (state, response) => {
      //   state.cities.push(response.data);
      // },
  }
};

export default cities;
