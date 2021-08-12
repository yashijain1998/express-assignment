import axios from "axios";

const group = {
  namespaced: true,
  state: {
    group: [],
  },
  getters: {
    groupDetail: (state) => {
      return state.group;
    },
  },
  actions: {
    getGroup({ commit }, payload) {
      let url = "http://localhost:7000/users";
      return axios
        .get(url + `/${payload.uname}/groups`)
        .then((response) => {
          commit("saveGroup", response);
        })
        .catch(() => {
          console.log("Error while fetching group.");
        });
    },
    addNewGroup({ commit }, payload) {
      let url = "http://localhost:7000/users";
      return axios
        .post(url + `/${payload.uname}/groups`, {
          region: payload.region,
          city: [
            {
              id: payload.cityId,
              name: payload.city,
            },
          ],
        })
        .then((response) => {
          commit("addGroup", response);
        })
        // .catch(() => {
        //   console.log("Error while adding new group.");
        // });
    },
    deleteGroup(_, payload) {
        let url = "http://localhost:7000/users";
        return axios.delete(url + `/${payload.uname}/groups/${payload.region}`)
        .then((response) => {
            console.log(response);
        })
    }
  },
  mutations: {
    saveGroup: (state, response) => {
      state.group = response.data;
    },
    addGroup: (state, response) => {
      state.group.push(response.data);
    },
  },
};

export default group;
