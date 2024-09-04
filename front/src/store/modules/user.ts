import axios from "axios";

const API_URL = '/api'; // Utiliser le proxy

const state = {
  user : {
    email: null,
    uid: null,
    nom: null,
    profile_picture: null
  },
  connected: false,
  loading: false,
};

const getters = {
  getUSer(state: any) {
    return state.user
  },
  getConnected(state: any) {
    return state.connected
  },
  getLoading(state: any) {
    return state.loading
  }
};

const actions = {
  async login({ commit }: any, uid: any) {
    commit("setLoading", true)
    await axios.post(`${API_URL}/login`, { uid })
      .then((response) => {
        const user = {
          email: response.data.email,
          uid: response.data.uid,
          nom: response.data.nom,
          profile_picture: response.data.profile_picture,
        };
        commit('setUser', user);
        commit('setConnected', true);
      }).catch((error) => {
        commit('setConnected', false);
        console.error(error);
      }).finally(() => {
        commit("setLoading", false)
      })
  },

  async authentification({ commit }: any, user: any) {
    commit("setLoading", true)
    console.log(API_URL + "/utilisateurs")
    await axios.post(`http://localhost:5001/utilisateurs`, user)
      .then((response) => {
        const userData = {
          email: response.data.email,
          uid: response.data.uid,
          nom: response.data.nom,
          profile_picture: response.data.profile_picture,
        };
        commit('setUser', userData);
        commit('setConnected', true);
      }).catch ((error) => {
        commit('setConnected', false);
        console.error(error);
      }).finally(() => {
        commit("setLoading", false)
      })
  },
  async disconnect({commit}: any) {
    const user = {
      email: null,
      account_id: null,
      nom: null,
      profile_picture: null
    }
    commit('setConnected', false );
    commit('setUser', user);
  }
};

const mutations = {
  setUser(state: any, value: any) {
    state.user = value
    console.log(value)
  },
  setConnected(state: any, value: any) {
    state.connected = value
    console.log("connected = true")
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