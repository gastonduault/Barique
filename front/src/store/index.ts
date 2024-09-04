import { createStore } from 'vuex'
import user from './modules/user'
import cellar from './modules/cellar'
import bottles from './modules/bottles'

export default createStore({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    user,
    cellar,
    bottles
  },
})