import axios from "axios";
import router from "@/router";

const API_URL = '/api'; // Utiliser le proxy

const state = {
  bottles: [],
  loadibg: false,
  bottleAdded: false,
  bottleDeletd: false,
};

const getters = {
  getBottles(state: any) {
    return state.bottles
  },
  getBottleAdded(state: any) {
    return state.bottleAdded
  },
  getLoading(state: any) {
    return state.loading
  },
  getBottleDeleted(state: any) {
    return state.bottleDeletd
  }
};

const actions = {
  async bottles({commit}: any, id: any) {
    commit('setLoading', true)
    axios.get(`${API_URL}/bouteilles/cave/` + id)
      .then((response) => {
        if(response.status == 200) // bottle in the cellar
          commit('setBottles', response.data)
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        commit('setLoading', false)
      })
  },
  async create({commit, dispatch}: any, bottle) {
    commit('setLoading', true)
    commit('setBottleAdded', false)
    axios.post(`${API_URL}/bouteilles`, bottle)
      .then(async (response) => {
        if(response.status == 200) {// bottle in the cellar
          await commit('setBottleAdded', true)
          dispatch('bottles', bottle.cave_id)
        }
      }).catch((error) => {
      commit('setBottleAdded', false)
      console.log(error)
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async delete({commit, dispatch}: any, bottle) {
    commit('setLoading', true)
    commit('setBottleDeleted', false)
    axios.delete(`${API_URL}/bouteilles/${bottle.id}`)
      .then(async (response) => {
        if(response.status == 200) {// bottle in the cellar
          await commit('setBottleDeleted', true)
          dispatch('bottles', bottle.cave_id)
        }
      }).catch((error) => {
      commit('setBottleDeleted', true)
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
  setBottleAdded(state: any, value: any) {
    state.bottleAdded = value
  },
  setBottleDeleted(state: any, value: any) {
    console.log("bottle deletdd ")
    state.bottleDeleted = value
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};