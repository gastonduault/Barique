import axios from "axios";

const API_URL = '/api'; // Utiliser le proxy

const state = {
  cellars: []
};

const getters = {
  getCellar(state) {
    return state.cellars
  },
};
const actions = {
  listCellars({commit}, uid) {
    try {
      axios.get(`${API_URL}/caves/owner/`+uid).then((response) => {
        commit('setCellar', response.data.caves);
      })
    } catch (error) {
      console.log(error)
    }
    //TODO: add loader
  },
  async createCellar({commit, dispatch}, cellar) {
    try {
      await axios.post(`${API_URL}/caves`, cellar).then((response) => {
        dispatch('listCellars', cellar.proprietaire_uid);
      })
    } catch (error) {
      console.log(error)
    }
  }
};

const mutations = {
  setCellar(state, value) {
    state.cellars = value
  },
  addCellar(state, value) {
    state.cellars.push(value)
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};