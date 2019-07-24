import {
  REPLACE_WMS_SERVICES,
  REPLACE_LOADING_WMS_SERVICES
} from '../types/mutation-types'

export const state = () => ({
  WMSServices: [],
  loadingWMSServices: false,
})

export const actions = {
  async getWMSServices ({ commit }, payload) {
    commit('REPLACE_LOADING_WMS_SERVICES', { loading: true })

    try {
      const { data } = await this.$WMSServiceAPI.index(payload)
      commit('REPLACE_WMS_SERVICES', { WMSServices: data.data })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_WMS_SERVICES', { loading: false })
    }
  }
}

export const mutations = {
  [REPLACE_WMS_SERVICES] (state, { WMSServices }) {
    state.WMSServices = WMSServices
  },
  [REPLACE_LOADING_WMS_SERVICES] (state, { loading }) {
    state.loadingWMSServices = loading
  },
}
