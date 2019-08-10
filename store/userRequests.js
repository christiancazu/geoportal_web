import {
  REPLACE_PENDING_REQUESTS,
  REPLACE_LOADING_PENDING_REQUESTS,
  REPLACE_REJECTED_REQUESTS,
  REPLACE_LOADING_REJECTED_REQUESTS,

} from '../types/mutation-types'

export const state = () => ({
  pendingRequests: [],
  loadingPendingRequests: false,
  rejectedRequests: [],
  loadingRejectedRequests: false,
})

export const actions = {
  async getPendingRequests ({ commit }, payload) {
    commit('REPLACE_LOADING_PENDING_REQUESTS', { loading: true })

    try {
      const { data } = await this.$userRequestAPI.getPending(payload)
      commit('REPLACE_PENDING_REQUESTS', { requests: data.data })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_PENDING_REQUESTS', { loading: false })
    }
  },

  async getRejectedRequests ({ commit }, payload) {
    commit('REPLACE_LOADING_REJECTED_REQUESTS', { loading: true })

    try {
      const { data } = await this.$userRequestAPI.getRejected(payload)
      commit('REPLACE_REJECTED_REQUESTS', { requests: data.data })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_REJECTED_REQUESTS', { loading: false })
    }
  }
}

export const mutations = {
  [REPLACE_PENDING_REQUESTS] (state, { requests }) {
    state.pendingRequests = requests
  },
  [REPLACE_LOADING_PENDING_REQUESTS] (state, { loading }) {
    state.loadingPendingRequests = loading
  },
  [REPLACE_REJECTED_REQUESTS] (state, { requests }) {
    state.rejectedRequests = requests
  },
  [REPLACE_LOADING_REJECTED_REQUESTS] (state, { loading }) {
    state.loadingRejectedRequests = loading
  },
}