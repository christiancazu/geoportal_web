import {
  REPLACE_GEOREFERENTIAL_IMAGE,
  REPLACE_LOADING_GEOREFERENTIAL_IMAGE,
  REPLACE_CURRENT_GEOREFERENTIAL_IMAGE

} from '../types/mutation-types'

export const state = () => ({
  georeferencedImages: [],
  loadingGeoreferentialImages: false,
  currentGeoreferentialImage: null,
})

export const actions = {
  async getGeoreferentialImages ({ commit }, payload) {
    commit('REPLACE_LOADING_GEOREFERENTIAL_IMAGE', { loading: true })
    try {
      const { data } = await this.$georeferencedImageAPI.get(payload)
      commit('REPLACE_GEOREFERENTIAL_IMAGE', { georeferencedImages: data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_GEOREFERENTIAL_IMAGE', { loading: false })
    }
  },
  replaceCurrentGeoreferentialImage ({ commit }, payload) {
    commit('REPLACE_CURRENT_GEOREFERENTIAL_IMAGE', payload)
  }
}

export const mutations = {
  [REPLACE_GEOREFERENTIAL_IMAGE] (state, { georeferencedImages }) {
    state.georeferencedImages = georeferencedImages
  },
  [REPLACE_LOADING_GEOREFERENTIAL_IMAGE] (state, { loading }) {
    state.loadingGeoreferentialImages = loading
  },
  [REPLACE_CURRENT_GEOREFERENTIAL_IMAGE] (state, { image }) {
    state.currentGeoreferentialImage = image
  }
}
