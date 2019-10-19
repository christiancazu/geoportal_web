import {
  REPLACE_RASTER_LAYER,
  REPLACE_CURRENT_RASTER_LAYER
} from '../types/mutation-types'

export const state = () => ({
  rasterLayers: [],
  currentRasterLayer: null,
})

export const actions = {
  async getRasterLayers ({ commit }, payload) {
    try {
      const { data } = await this.$rasterLayerAPI.get()
      let rasterLayers = data || []
      rasterLayers.forEach(val => {
        val.name = val.name || "--"
        val.title = val.title || "--"
      })
      commit(REPLACE_RASTER_LAYER, { rasterLayers })
    } catch (error) {
      throw error
    } 
  },

  replaceCurrentRasterLayer ({ commit }, payload) {
    commit(REPLACE_CURRENT_RASTER_LAYER, payload)
  },

  async updateRasterLayer ({ commit }, payload) {
    try {
      await this.$rasterLayerAPI.update(payload)
    } catch (error) {
      throw error
    }
  },
}

export const mutations = {
  [REPLACE_RASTER_LAYER] (state, { rasterLayers }) {
    state.rasterLayers = rasterLayers
  },

  [REPLACE_CURRENT_RASTER_LAYER] (state, { rasterLayer }) {
    state.currentRasterLayer = rasterLayer
  }
}
