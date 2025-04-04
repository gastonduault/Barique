import axios from "axios";
import router from "@/router";
import config from "@/store/modules/config";
import i18n from "@/lang";

const API_URL = config.API_URL;

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
  async bottles({dispatch, commit}: any, id: any) {
    commit('setLoading', true)
    axios.get(`${API_URL}/bottles/cellars/` + id)
      .then((response) => {
        if(response.status == 200) // bottle in the cellar
          commit('setBottles', response.data)
      }).catch((error) => {
        dispatch(
          'notifications/newNotification',
          {
            message: i18n.global.t('errorLoadBottles'),
            good: false,
          },
          { root: true },
        )
      }).finally(() => {
        commit('setLoading', false)
      })
  },
  async create({commit, dispatch}: any, bottle) {
    commit('setLoading', true)
    commit('setBottleAdded', false)
    axios.post(`${API_URL}/bottles`, bottle)
      .then(async (response) => {
        if(response.status == 200) {// bottle in the cellar
          await commit('setBottleAdded', true)
          dispatch('bottles', bottle.cave_id)
        }
      }).catch((error) => {
      commit('setBottleAdded', false)
      dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('errorCreateBottle'),
          good: false,
        },
        { root: true },
      )
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async update({commit, dispatch}: any, bottle) {
    commit('setLoading', true)
    axios.post(`${API_URL}/bottles/${bottle.id}`, bottle)
      .then(async (response) => {
        if(response.status == 200) {// bottle in the cellar
          dispatch('bottles', bottle.cave_id)
        }
      }).catch((error) => {
      dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('errorUpdateBottle'),
          good: false,
        },
        { root: true },
      )
    }).finally(() => {
      commit('setLoading', false)
    })
  },
  async delete({commit, dispatch}: any, bottle) {
    commit('setLoading', true)
    commit('setBottleDeleted', false)
    axios.post(`${API_URL}/bottles/drunk/${bottle.id}`, bottle)
      .then(async (response) => {
        if(response.status == 200) {// bottle in the cellar
          await commit('setBottleDeleted', true)
          dispatch('bottles', bottle.cave_id)
          dispatch(
            'notifications/newNotification',
            {
              message: bottle.nom + " " + i18n.global.t('addToHisotry'),
              good: true,
            },
            { root: true },
          )
          dispatch('history/bottles', bottle.cave_id, {root: true})
        }
      }).catch((error) => {
      commit('setBottleDeleted', false)
      dispatch(
        'notifications/newNotification',
        {
          message: i18n.global.t('deleteBottle'),
          good: false,
        },
        { root: true },
      )
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