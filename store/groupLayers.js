import {
  REPLACE_GROUP_LAYER,
  REPLACE_LOADING_GROUP_LAYER
} from '../types/mutation-types'

export const state = () => ({
  groupLayers: [],
  loadingGroupLayers: false,
})

export const actions = {
  async getGroupLayers ({ commit }, payload) {
    commit('REPLACE_LOADING_GROUP_LAYER', { loading: true })
    try {
      const { data } = await this.$groupLayerAPI.index(payload)
      commit('REPLACE_GROUP_LAYER', { groupLayers: data.data })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_GROUP_LAYER', { loading: false })
    }
  }
}

export const mutations = {
  [REPLACE_GROUP_LAYER] (state, { groupLayers }) {
    state.groupLayers = groupLayers
  },
  [REPLACE_LOADING_GROUP_LAYER] (state, { loading }) {
    state.loadingGroupLayers = loading
  },
}
