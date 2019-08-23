import {
  REPLACE_RASTER_LAYER,
  REPLACE_LOADING_RASTER_LAYER,
  REPLACE_CURRENT_RASTER_LAYER,
  REPLACE_SHOW_MODAL_PUBLISH_RASTER_LAYER

} from '../types/mutation-types'

export const state = () => ({
  rasterLayers: [],
  loadingRasterLayers: false,
  currentRasterLayer: null,
  showModalPublishRasterLayer: false
})

export const actions = {
  async getRasterLayer ({ commit }, payload) {
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
  replaceCurrentLayer ({ commit }, payload) {
    commit('REPLACE_CURRENT_RASTER_LAYER', payload)
  },
  replaceShowModalPublishRasterLayer ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_PUBLISH_RASTER_LAYER', payload)
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
  },
  [REPLACE_SHOW_MODAL_PUBLISH_RASTER_LAYER] (state, { show }) {
    state.showModalPublishRasterLayer = show
  }
}
