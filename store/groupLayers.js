import {
  REPLACE_GROUP_LAYER,
  REPLACE_LOADING_GROUP_LAYER,
  REPLACE_CURRENT_GROUP_LAYER
} from '../types/mutation-types'

export const state = () => ({
  groupLayers: [],
  loadingGroupLayers: false,
  currentGroupLayer: null
})

export const actions = {
  async getGroupLayers ({ commit }, payload) {
    commit('REPLACE_LOADING_GROUP_LAYER', { loading: true })
    try {
      const { data } = await this.$groupLayerAPI.index(payload)
      commit('REPLACE_GROUP_LAYER', { groupLayers: data.data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_GROUP_LAYER', { loading: false })
    }
  },
  replaceCurrentGroupLayer ({ commit }, payload) {
    commit('REPLACE_CURRENT_GROUP_LAYER', payload)
  }
}

export const mutations = {
  [REPLACE_GROUP_LAYER] (state, { groupLayers }) {
    state.groupLayers = groupLayers
  },
  [REPLACE_LOADING_GROUP_LAYER] (state, { loading }) {
    state.loadingGroupLayers = loading
  },
  [REPLACE_CURRENT_GROUP_LAYER] (state, { groupLayer }) {
    state.currentGroupLayer = groupLayer
  },
}
