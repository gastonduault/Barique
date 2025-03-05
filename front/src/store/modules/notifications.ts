const state = {
  notification: [],
}

const getters = {
  getNotifications(state) {
    return state.notification
  },
}

const actions = {
  async newNotification({ commit }, { message, good }) {
    const id = Date.now()
    commit('setNotification', {
      id: id,
      message: message,
      good: good,
    })
    setTimeout(() => {
      commit('removeNotification', id)
    }, 3000)
  },
  async removeNotification({commit}, id) {
    commit('removeNotification', id);
  }
}

const mutations = {
  setNotification(state, { id, message, good }) {
    state.notification.push({
      id: id,
      message: message,
      good: good,
    })
  },
  removeNotification(state, id) {
    state.notification = state.notification.filter((notification) => notification.id !== id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}