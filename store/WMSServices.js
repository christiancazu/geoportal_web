import { REPLACE_WMS_SERVICES } from '../types/mutation-types'

export const state = () => ({
  WMSServices: []
})

export const actions = {
  async getWMSServices ({ commit }, payload) {
    const { data } = await this.$WMSServiceAPI.index(payload)
    commit(REPLACE_WMS_SERVICES, { WMSServices: data || [] })
  }
}

export const mutations = {
  [REPLACE_WMS_SERVICES] (state, { WMSServices }) {
    state.WMSServices = WMSServices
  }
}
