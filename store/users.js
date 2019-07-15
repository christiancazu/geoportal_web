import {
  REPLACE_REGISTERED_USER,
  REPLACE_LOADING_REGISTERED_USER,
  REPLACE_REGISTERED_USER_VALID
} from '../types/mutation-types'

export const state = () => ({
  registeredUser: null,
  loadingRegisteredUser: false,
  registeredUserValid: false
})

export const actions = {
  async getUser({ commit }, payload) {
    commit('REPLACE_LOADING_REGISTERED_USER', { loading: true })

    try {
      const { data } = await this.$userAPI.index(payload)
      commit('REPLACE_REGISTERED_USER', { user: data })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_REGISTERED_USER', { loading: false })
    }
  },

  replaceRegisteredUserValid ({ commit }, payload){
    commit('REPLACE_REGISTERED_USER_VALID', payload)
  }
}

export const mutations = {
  [REPLACE_REGISTERED_USER](state, { user }) {
    state.registeredUser = user
  },
  [REPLACE_LOADING_REGISTERED_USER](state, { loading }) {
    state.loadingRegisteredUser = loading
  },
  [REPLACE_REGISTERED_USER_VALID](state, { valid }) {
    state.registeredUserValid = loading
  }
}
