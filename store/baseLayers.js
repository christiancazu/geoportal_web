import {
  REPLACE_BASE_LAYERS
} from '../types/mutation-types'

export const state = () => ({
  baseLayers: []
})

export const actions = {
  async getBaseLayers ({ commit }, payload) {
    try {
      const { data } = await this.$baseLayerAPI.get(payload)
      commit('REPLACE_BASE_LAYERS', { baseLayers: data || [] })
    } catch (error) {
      throw error
    }
  }
}

export const mutations = {
  [REPLACE_BASE_LAYERS] (state, { baseLayers }) {
    state.baseLayers = baseLayers
  }
}
