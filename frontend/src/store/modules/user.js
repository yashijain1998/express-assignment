import axios from "axios";

const users = {
  namespaced: true,
  state: {
    user: [],
  },
  getters: {
      userDetail: (state) => {
          return state.user;
      }
  },
  actions: {
    getUser({commit}) {
        let url ="http://localhost:7000/users";
        return axios.get(url)
        .then((response) => {
            commit('saveUser',response);
        })
        .catch(() => {
            console.log('Error while fetching user.');
        });
    }
  },
  mutations: {
      saveUser: (state, response) => {
        state.user = response.data;
      },
  }
};

export default users;
