import axios from "axios";
import config from './config';
import {Storage} from "@ionic/storage";
import { signInWithGoogle, logout } from '@/firebase-config';

const API_URL = config.API_URL;

const storage = new Storage();

const state = {
  user: {
    email: null,
    uid: null,
    nom: null,
    profile_picture: null
  },
  connected: false,
  loading: false,
};

const getters = {
  getUser(state: any) {
    return state.user;
  },
  getConnected(state: any) {
    return state.connected;
  },
  getLoading(state: any) {
    return state.loading;
  }
};

const actions = {
  async authentification({ commit }: any) {
    commit("setLoading", true);

    try {
      const googleUser = await signInWithGoogle();
      if (!googleUser) {
        throw new Error("Google authentication failed.");
      }

      const idToken = await googleUser.getIdToken();
      const response = await axios.post(`${API_URL}/utilisateurs`, {}, {
        headers: { Authorization: `Bearer ${idToken}` }
      });

      const userData = {
        email: response.data.email,
        uid: response.data.uid,
        nom: response.data.nom,
        profile_picture: response.data.profile_picture,
      };

      await storage.create();
      await storage.set('token', idToken)

      commit("setUser", userData);
      commit("setConnected", true);
    } catch (error) {
      commit("setConnected", false);
    } finally {
      commit("setLoading", false);
    }
  },

  async disconnect({ commit }: any) {
    try {
      await logout();
      localStorage.removeItem("token");
      commit("setUser", { email: null, uid: null, nom: null, profile_picture: null });
      commit("setConnected", false);
    } catch (error) {
      console.error("Error disconnection :", error);
    }
  }
};

const mutations = {
  setUser(state: any, value: any) {
    state.user = value;
  },
  setConnected(state: any, value: any) {
    state.connected = value;
  },
  setLoading(state: any, value: any) {
    state.loading = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);