import {
  REPLACE_USERS,
  REPLACE_LOADING_USERS,
  REPLACE_USER,
  REPLACE_LOADING_USER
} from '../types/mutation-types'

export const state = () => ({
  users: [],
  loadingUsers: false,
  user: null,
  loadingUser: false,
})

export const getters = {
  isAdmin: (state, getters, rootState, rootGetters) => {
    const user = rootState.auth.user
    return user && user.userType.id === 'AD'
  }
}

export const actions = {
  async getUsers ({ commit }, payload) {
    commit('REPLACE_LOADING_USERS', { loading: true })

    try {
      const { data } = await this.$userAPI.index(payload)

      commit('REPLACE_USERS', { users: data.data || [] })
      commit('REPLACE_LOADING_USERS', { loading: false })

    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_USERS', { loading: false })
    }
  },

  async getUser ({ commit }, payload) {
    commit('REPLACE_LOADING_USER', { loading: true })

    try {
      const { data } = await this.$userAPI.getUser(payload)
      commit('REPLACE_USER', { user: data.data })
      commit('REPLACE_LOADING_USER', { loading: false })

    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_USER', { loading: false })
    }
  },
}

export const mutations = {
  [REPLACE_USERS] (state, { users }) {
    state.users = users
  },
  [REPLACE_LOADING_USERS] (state, { loading }) {
    state.loadingUsers = loading
  },
  [REPLACE_USER] (state, { user }) {
    state.user = user
  },
  [REPLACE_LOADING_USER] (state, { loading }) {
    state.loadingUser = loading
  },
}
