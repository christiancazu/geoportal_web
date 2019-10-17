import {
  REPLACE_BASE_LAYERS,
  REPLACE_LOADING_BASE_LAYERS
} from '../types/mutation-types'

export const state = () => ({
  baseLayers: [],
  loadingBaselayers: false,
})

export const actions = {
  async getBaseLayers ({ commit }, payload) {
    commit('REPLACE_LOADING_BASE_LAYERS', { loading: true })

    try {
      const { data } = await this.$baseLayerAPI.get(payload)
      commit('REPLACE_BASE_LAYERS', { baseLayers: data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_BASE_LAYERS', { loading: false })
    }
  }

}

export const mutations = {
  [REPLACE_BASE_LAYERS] (state, { baseLayers }) {
    state.baseLayers = baseLayers
  },
  [REPLACE_LOADING_BASE_LAYERS] (state, { loading }) {
    state.loadingBaselayers = loading
  },
}
