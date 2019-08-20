import {
  REPLACE_WMS_AUTHORS,
  REPLACE_LOADING_WMS_AUTHORS
} from '../types/mutation-types'

export const state = () => ({
  WMSAuthors: [],
  loadingWMSAuthors: false,
})

export const actions = {
  async getWMSAuthors ({ commit }, payload) {
    commit('REPLACE_LOADING_WMS_AUTHORS', { loading: true })

    try {
      const { data } = await this.$WMSAuthorAPI.index(payload)
      commit('REPLACE_WMS_AUTHORS', { WMSAuthors: data.data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_WMS_AUTHORS', { loading: false })
    }
  }
}

export const mutations = {
  [REPLACE_WMS_AUTHORS] (state, { WMSAuthors }) {
    state.WMSAuthors = WMSAuthors
  },
  [REPLACE_LOADING_WMS_AUTHORS] (state, { loading }) {
    state.loadingWMSAuthors = loading
  },
}
