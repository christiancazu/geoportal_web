import {
  REPLACE_BASE_MAPS,
  REPLACE_LOADING_BASE_MAPS
} from '../types/mutation-types'

export const state = () => ({
  baseMaps: [],
  loadingBaseMaps: false,
})

export const actions = {
  async getBaseMaps ({ commit }, payload) {
    commit('REPLACE_LOADING_BASE_MAPS', { loading: true })

    try {
      const { data } = await this.$baseMapAPI.index(payload)
      commit('REPLACE_BASE_MAPS', { baseMaps: data.data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_BASE_MAPS', { loading: false })
    }
  }

}

export const mutations = {
  [REPLACE_BASE_MAPS] (state, { baseMaps }) {
    state.baseMaps = baseMaps
  },
  [REPLACE_LOADING_BASE_MAPS] (state, { loading }) {
    state.loadingBaseMaps = loading
  },
}
