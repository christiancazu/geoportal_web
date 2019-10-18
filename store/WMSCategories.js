import {
  REPLACE_WMS_CATEGORIES,
  REPLACE_LOADING_WMS_CATEGORIES
} from '../types/mutation-types'

export const state = () => ({
  WMSCategories: [],
  loadingWMSCategories: false,
})

export const actions = {
  async getWMSCategories ({ commit }, payload) {
    commit('REPLACE_LOADING_WMS_CATEGORIES', { loading: true })

    try {
      const { data } = await this.$WMSCategoryAPI.index(payload)
      commit('REPLACE_WMS_CATEGORIES', { WMSCategories: data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_WMS_CATEGORIES', { loading: false })
    }
  }
}

export const mutations = {
  [REPLACE_WMS_CATEGORIES] (state, { WMSCategories }) {
    state.WMSCategories = WMSCategories
  },
  [REPLACE_LOADING_WMS_CATEGORIES] (state, { loading }) {
    state.loadingWMSCategories = loading
  },
}
