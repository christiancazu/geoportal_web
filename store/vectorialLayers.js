import {
  REPLACE_LAYERS,
  REPLACE_CURRENT_LAYER
} from '../types/mutation-types'

export const state = () => ({
  layers: [],
  currentLayer: null
})

export const actions = {
  async getVectorialLayers ({ commit }) {
    try {
      const { data } = await this.$vectorialLayerAPI.get()
      commit(REPLACE_LAYERS, { layers: data || [] })
    } catch (error) {
      throw error
    } 
  },

  async getVectorialLayer ({ commit }, payload) {
    try {
      const { data } = await this.$vectorialLayerAPI.getById(payload)
      commit(REPLACE_CURRENT_LAYER, { layer: data })
    } catch (error) {
      throw error
    }
  },

  async updateVectorialLayer ({ commit }, payload) {
    try {
      await this.$vectorialLayerAPI.update(payload)
    } catch (error) {
      throw error
    }
  },

  async deleteVectorialLayer ({ commit }, payload) {
    try {
      await this.$vectorialLayerAPI.delete(payload)
    } catch (error) {
      throw error
    }
  },

  replaceCurrentLayer ({ commit }, payload) {
    commit(REPLACE_CURRENT_LAYER, payload)
  }
}

export const mutations = {
  [REPLACE_LAYERS] (state, { layers }) {
    state.layers = layers
  },
  [REPLACE_CURRENT_LAYER] (state, { layer }) {
    state.currentLayer = layer
  }
}
