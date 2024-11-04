import axios from "axios";

const API_URL = '/api'; // Utiliser le proxy

const state = {
  cellars: [],
  cellarSelected: {
    id: null,
    nom: null
  },
  images: [],
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
  },
  getImages(state: any) {
    return state.images
  }
};
const actions = {
  async listCellars({commit}: any, uid: any) {
    commit('setLoading', true)
    axios.get(`${API_URL}/caves/owner/`+uid)
    .then((response) => {
        commit('setCellars', response.data.caves)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async create({commit, dispatch}: any, cellar: any) {
    commit('setLoading', true)
    axios.post(`${API_URL}/caves`, cellar)
    .then((response) => {
        dispatch('listCellars', cellar.proprietaire_uid)
    }).catch((error) => {
        console.log(error)
    }).finally(() => {
        commit('setLoading', false)
    })
  },
  async update({commit, dispatch}: any, cellar: any) {
    commit('setLoading', true)
    axios.post(`${API_URL}/caves/${cellar.id}`, cellar)
    .then((response) => {
        commit('setCellarSelected', cellar)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async delete({commit, dispatch}: any, cellar: any) {
    commit('setLoading', true)
    axios.delete(`${API_URL}/caves/${cellar.id}`)
      .then((response) => {
        commit('setCellarSelected', {})
      }).catch((error) => {
      console.log(error)
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async listImage({commit}: any) {
    await commit('setLoading', true)
    await axios.get(`${API_URL}/caves/images`)
      .then(async (response) => {
        await commit('setImages', response.data.available_images)
      })
      .finally(() => {
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
  },
  setImages(state: any, value: any) {
    state.images = value
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};