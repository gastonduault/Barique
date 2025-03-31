import axios from "axios";
import config from "@/store/modules/config";
import router from "@/router";
import {Storage} from "@ionic/storage";
import i18n from "@/lang";

const API_URL = config.API_URL;
const storage = new Storage();

const state = {
  cellars: [],
  cellarSelected: {},
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
  async listCellars({dispatch, commit}: any) {
    commit('setLoading', true)
    axios.get(`${API_URL}/cellars/owner`)
    .then((response) => {
        commit('setCellars', response.data.caves)
    }).catch((error) => {
      dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('errorLoadCellar'),
          good: false,
        },
        { root: true },
      )
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async create({commit, dispatch}: any, name: string) {
    commit('setLoading', true)
    axios.post(`${API_URL}/cellars`, { name: name } )
    .then((response) => {
      dispatch("updateCellarSelected", response.data.cave);
      dispatch("listCellars");
      router.push("/cellar");
    }).catch((error) => {
      dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('errorCreateCellar'),
          good: false,
        },
        { root: true },
      )
    }).finally(() => {
        commit('setLoading', false)
    })
  },
  async update({commit, dispatch}: any, cellar: any) {
    commit('setLoading', true)
    axios.post(`${API_URL}/cellars/${cellar.id}`, cellar)
    .then((response) => {
      commit('setCellarSelected', cellar);
      dispatch('listCellars');
      router.push("/cellar")
    }).catch((error) => {
      dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('errorUpdateCellar'),
          good: false,
        },
        { root: true },
      )
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async delete({commit, dispatch}: any, cellar: any) {
    commit('setLoading', true)
    axios.delete(`${API_URL}/cellars/${cellar.id}`)
      .then(async (response) => {
        await dispatch('updateCellarSelected', {});
        await dispatch('listCellars');
        await router.push('/cellarList')
      }).catch((error) => {
      dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('errorDeleteCellar'),
          good: false,
        },
        { root: true },
      )
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async listImage({commit}: any) {
    await commit('setLoading', true)
    await axios.get(`${API_URL}/cellars/images`)
      .then(async (response) => {
        await commit('setImages', response.data.available_images)
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  async updateCellarSelected({commit}: any, cellar: any) {
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
  async setCellarSelected(state: any, value: any) {
    state.cellarSelected = value
    await storage.create();
    await storage.set('cellar', value)
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