import { REPLACE_WMS_AUTHORS } from '../types/mutation-types'

export const state = () => ({
  WMSAuthors: []
})

export const actions = {
  async getWMSAuthors ({ commit }, payload) {
    const { data } = await this.$WMSAuthorAPI.index(payload)
    commit(REPLACE_WMS_AUTHORS, { WMSAuthors: data || [] })
  }
}

export const mutations = {
  [REPLACE_WMS_AUTHORS] (state, { WMSAuthors }) {
    state.WMSAuthors = WMSAuthors
  }
}
