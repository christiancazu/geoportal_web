import {
  REPLACE_USERS,
  REPLACE_LOADING_USERS
} from '../types/mutation-types'

export const state = () => ({
  users: [],
  loadingUsers: false,
})

export const actions = {
  async getUsers ({ commit }, payload) {
    commit('REPLACE_LOADING_USERS', { loading: true })

    try {
      const { data } = await this.$userAPI.index(payload)
      commit('REPLACE_USERS', { users: data.data })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_USERS', { loading: false })
    }
  }

}

export const mutations = {
  [REPLACE_USERS] (state, { users }) {
    state.users = users
  },
  [REPLACE_LOADING_USERS] (state, { loading }) {
    state.loadingUsers = loading
  },
}
