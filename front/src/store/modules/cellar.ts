import axios from "axios";

const API_URL = '/api'; // Utiliser le proxy

const state = {
  cellars: [],
  cellarSelected: {
    id: null,
    nom: null
  },
  loading: false,
};

const getters = {
  getCellar(state: any) {
    return state.cellars
  },
  getCellarSelected(state: any) {
    return state.cellarSelected
  },
  getLoading(state: any) {
    return state.loading
  }
};
const actions = {
  async listCellars({commit}: any, uid: any) {
    commit('setLoading', true)
    await axios.get(`${API_URL}/caves/owner/`+uid)
      .then((response) => {
        commit('setCellars', response.data.caves)
        console.log(response)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async createCellar({commit, dispatch}: any, cellar: any) {
    commit('setLoading', true)
    await axios.post(`${API_URL}/caves`, cellar)
      .then((response) => {
        dispatch('listCellars', cellar.proprietaire_uid)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        commit('setLoading', false)
      })
  },
  async updtaeCellarSelected({commit}: any, cellar:any) {
    await commit('setCellarSelected', cellar)
  }
};

const mutations = {
  setCellars(state: any, value: any) {
    state.cellars = value
  },
  addCellar(state: any, value: any) {
    state.cellars.push(value)
  },
  setCellarSelected(state: any, value: any) {
    state.cellarSelected = value
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