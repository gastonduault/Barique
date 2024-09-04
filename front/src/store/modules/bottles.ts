import axios from "axios";

const API_URL = '/api'; // Utiliser le proxy

const state = {
  bottles: [],
  loadibg: false,
};

const getters = {
  getBottles(state: any) {
    return state.cellars
  },
  getLoading(state: any) {
    return state.loading
  }
};

const actions = {
  async bottles({commit}: any, id: any) {
    console.log("request")
    commit('setLoading', true)
    await axios.get(`${API_URL}/bouteilles/cave/` + id)
      .then((response) => {
        if(response.status == 200) // bottle in the cellar
          console.log(response.data)
        // } else if (response.status == 201) { // cellar empty
        //
        // }
        // commit('setBottles', response.data.bouteilles)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        commit('setLoading', false)
      })
  },
  async create({commit}: any, bottle) {
    commit('setLoading', true)
    await axios.post(`${API_URL}/bouteilles`, bottle)
      .then((response) => {
        if(response.status == 200) // bottle in the cellar
          console.log(response.data)
        // } else if (response.status == 201) { // cellar empty
        //
        // }
        // commit('setBottles', response.data.bouteilles)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        commit('setLoading', false)
      })
  },
};

const mutations = {
  setBottles(state: any, value: any) {
    state.bottles = value
  },
  setLoading(state: any, value: any) {
    state.loading = value
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};