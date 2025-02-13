import axios from "axios";
import router from "@/router";
import config from "@/store/modules/config";

const API_URL = config.API_URL;

const state = {
  bottles: [],
  loadibg: false,
};

const getters = {
  getBottles(state: any) {
    return state.bottles
  },
  getLoading(state: any) {
    return state.loading
  },
};

const actions = {
  async bottles({commit}: any, id: any) {
    commit('setLoading', true)
    axios.get(`${API_URL}/historique/${id}`)
      .then((response) => {
        if(response.status == 200) // bottle in the cellar
          commit('setBottles', response.data)
      }).catch((error) => {
      console.log(error)
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async update({commit, dispatch}: any, bottle) {
    commit('setLoading', true)
    axios.post(`${API_URL}/historique/${bottle.id}`, bottle)
      .then(async (response) => {
        if(response.status == 200) {// bottle in the cellar
          dispatch('bottles', bottle.cave_id)
        }
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
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};