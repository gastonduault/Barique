import { createStore } from 'vuex'
import user from './modules/user'
import cellar from './modules/cellar'
import bottles from './modules/bottles'
import history from './modules/history'
import config from './modules/config'
import notifications from './modules/notifications'

export default createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    user,
    cellar,
    bottles,
    history,
    config,
    notifications
  },
})