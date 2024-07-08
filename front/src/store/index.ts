import { createStore } from 'vuex'
import user from './modules/user'
import cellar from './modules/cellar'

export default createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    user, cellar
  },
})