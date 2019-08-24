import {
  REPLACE_RASTER_LAYER,
  REPLACE_LOADING_RASTER_LAYER,
  REPLACE_CURRENT_RASTER_LAYER

} from '../types/mutation-types'

export const state = () => ({
  rasterLayers: [],
  loadingRasterLayers: false,
  currentRasterLayer: null,
})

export const actions = {
  async getRasterLayers ({ commit }, payload) {
    commit('REPLACE_LOADING_RASTER_LAYER', { loading: true })
    try {
      const { data } = await this.$rasterLayerAPI.index(payload)
      commit('REPLACE_RASTER_LAYER', { rasterLayers: data.data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_RASTER_LAYER', { loading: false })
    }
  },
  replaceCurrentRasterLayer ({ commit }, payload) {
    commit('REPLACE_CURRENT_RASTER_LAYER', payload)
  }
}

export const mutations = {
  [REPLACE_RASTER_LAYER] (state, { rasterLayers }) {
    state.rasterLayers = rasterLayers
  },
  [REPLACE_LOADING_RASTER_LAYER] (state, { loading }) {
    state.loadingRasterLayers = loading
  },
  [REPLACE_CURRENT_RASTER_LAYER] (state, { rasterLayer }) {
    state.currentRasterLayer = rasterLayer
  }
}
