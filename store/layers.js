import {
  REPLACE_LAYERS,
  REPLACE_LOADING_LAYERS
} from '../types/mutation-types'

export const state = () => ({
  layers: [],
  loadingLayers: false,
})

export const actions = {
  async getLayers ({ commit }, payload) {
    commit('REPLACE_LOADING_LAYERS', { loading: true })
    try {
      const { data } = await this.$layerAPI.index(payload)
      commit('REPLACE_LAYERS', { layers: data.data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_LAYERS', { loading: false })
    }
  }
}

export const mutations = {
  [REPLACE_LAYERS] (state, { layers }) {
    state.layers = layers
  },
  [REPLACE_LOADING_LAYERS] (state, { loading }) {
    state.loadingLayers = loading
  },
}
