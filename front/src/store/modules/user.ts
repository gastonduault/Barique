import axios from "axios";
import router from "@/router";

const API_URL = '/api'; // Utiliser le proxy

const state = {
     user : {
        email: null,
        uid: null,
        nom: null,
        profile_picture: null
    },
    connected: false,
};

const getters = {
    getUSer(state) {
        return state.user
    },
    getConnected(state) {
        return state.connected
    }
};

const actions = {
    async login({ commit }, uid) {
        try {
            const response = await axios.post(`${API_URL}/login`, { uid });
            const user = {
                email: response.data.email,
                uid: response.data.uid,
                nom: response.data.nom,
                profile_picture: response.data.profile_picture,
            };
            commit('setUser', user);
            commit('setConnected', true);
        } catch (error) {
            commit('setConnected', false);
            console.error(error);
        }
    },

    async authentification({ commit }, user) {
        try {
            const response = await axios.post(`${API_URL}/utilisateurs`, user);
            const userData = {
                email: response.data.email,
                uid: response.data.uid,
                nom: response.data.nom,
                profile_picture: response.data.profile_picture,
            };
            commit('setUser', userData);
            commit('setConnected', true);
        } catch (error) {
            commit('setConnected', false);
            console.error(error);
        }
        // TODO: add loader
        // finally {}
    },
    async disconnect({commit}) {
        const user = {
            email: null,
            account_id: null,
            nom: null,
            profile_picture: null
        }
        commit('setConnected', false );
        commit('setUser', user);
        router.push('/home')
    }
};

const mutations = {
    setUser(state, value) {
        state.user = value
        console.log(value)
    },
    setConnected(state, value) {
        state.connected = value
        console.log("connected = true")
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
};