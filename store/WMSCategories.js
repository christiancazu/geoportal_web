import { REPLACE_WMS_CATEGORIES } from '../types/mutation-types'

export const state = () => ({
  WMSCategories: []
})

export const actions = {
  async getWMSCategories ({ commit }, payload) {
    const { data } = await this.$WMSCategoryAPI.index(payload)
    commit(REPLACE_WMS_CATEGORIES, { WMSCategories: data || [] })
  }
}

export const mutations = {
  [REPLACE_WMS_CATEGORIES] (state, { WMSCategories }) {
    state.WMSCategories = WMSCategories
  }
}
