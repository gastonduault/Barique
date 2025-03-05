import axios from "axios";
import config from './config';
import {Storage} from "@ionic/storage";
import { signInWithGoogle, logout, auth } from '@/firebase-config';
import router from "@/router";
import i18n from "@/lang";

const API_URL = config.API_URL;
const storage = new Storage();

const state = {
  user: {},
  connected: false,
  loading: false,
  try: 0
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
  async authentification({dispatch, commit }: any) {
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

      await storage.create();
      await storage.set('token', idToken)
      dispatch('navigation', response)
    } catch (error) {
      commit("setConnected", false);
      await dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('connectionError'),
          good: false,
        },
        { root: true },
      )
      if(state.try <= 5) {
        setTimeout(() => {
          commit("incrementTry")
          dispatch('me')
        }, 3000)
      }
    } finally {
      commit("setLoading", false);
    }
  },
  async logIn({ commit, dispatch }: any) {
    commit("setLoading", true);
    try {
      await storage.create();
      let idToken = await storage.get("token");
      if (!idToken) {
        throw new Error("No token found");
      }
      // wait firbase charge the user
      await new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            resolve(user);
          }
          unsubscribe();
        });
      });
      const user = auth.currentUser;
      if (user) {
        idToken = await user.getIdToken(true); // force the refreshing of the token
        await storage.set("token", idToken);
      }

      const response = await axios.post(`${API_URL}/utilisateurs`, {}, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      dispatch('navigation', response)
    } catch (error) {
      commit("setConnected", false);
    } finally {
      commit("setLoading", false);
    }
  },
  async initializeAuth({ dispatch }: any) {
    await storage.create();
    const token = await storage.get("token");

    if (token) {
      await dispatch("me");
    }
  },
  async me({ commit, dispatch }: any) {
    try {
      await storage.create();
      let idToken = await storage.get("token");
      if (!idToken) {
        throw new Error("No token found");
      }
      await new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            resolve(user);
          }
          unsubscribe();
        });
      });
      const user = auth.currentUser;
      if (user) {
        idToken = await user.getIdToken(true); // force the refreshing of the token
        await storage.set("token", idToken);
      }

      const response = await axios.post(`${API_URL}/utilisateurs`, {}, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      dispatch('navigation', response)
    } catch (error) {
      commit("setConnected", false);
      console.log(error)
      await dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('connectionError'),
          good: false,
        },
        { root: true },
      )
      if(state.try <= 5) {
        setTimeout(() => {
          commit("incrementTry")
          dispatch('me')
        }, 3000)
      }
    }
  },
  async disconnect({ dispatch, commit }: any) {
    try {
      await logout();
      await storage.create();
      await storage.remove("token");
      await storage.remove("cellar");
      dispatch('cellar/updateCellarSelected', {}, {root: true})
      commit("setUser", {});
      commit("setConnected", false);
      router.push('/login')
    } catch (error) {
      console.error("Error disconnection :", error);
    }
  },
  async navigation({dispatch, commit}, response) {
    const userData = {
      email: response.data.email,
      uid: response.data.uid,
      nom: response.data.nom,
      profile_picture: response.data.profile_picture,
    };
    const position = router.currentRoute.value.fullPath
    commit("setUser", userData);
    commit("setConnected", true);
    if (position === "/login" || position === "/home"){
      if (response.data.cave && response.data.cave.nom) {
        dispatch('cellar/updateCellarSelected', response.data.cave, {root: true})
        router.push("/cellar");
      } else {
        router.push("/create-cellar");
      }
    }
    commit("setTry", 0)
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
  },
  incrementTry(state: any) {
    state.try++;
  },
  setTry(state: any, value: any) {
    state.try = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};


axios.interceptors.request.use(async (config) => {
  await storage.create();
  const token = await storage.get("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
