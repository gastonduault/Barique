import axios from "axios";
import router from "@/router";

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
    async login({commit}, uid) {
        try {
            axios.post('http://localhost:5001/login', {uid}).then((response) => {
                const user = {
                    email: response.data.email,
                    uid: response.data.uid,
                    nom: response.data.nom,
                    profile_picture: response.data.profile_picture
                }
                commit('setUser', user);
                commit('setConnected', true );
                if(router.currentRoute.value.fullPath === '/home') router.push('/caveList')
            })
        } catch(error) {
            commit('setConnected', false );
            console.error(error);
            router.push('/home')
        }
    },
    async authentification({commit}, user) {
        try {
             await axios.post('http://localhost:5001/utilisateurs', user).then((response) => {
                 const user = {
                     email: response.data.email,
                     uid: response.data.uid,
                     nom: response.data.nom,
                     profile_picture: response.data.profile_picture
                 }
                 commit('setUser', user);
                 commit('setConnected', true );
                router.push('/caveList')
             })
        } catch(error) {
            commit('setConnected', false );
            console.error(error);
        }
        //TODO: add loader
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