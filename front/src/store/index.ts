import { createStore } from 'vuex'
import user from './user'
import cellar from './cellar'

export default createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    user, cellar
  },
})