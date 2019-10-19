import {
  REPLACE_GROUP_LAYER,
  REPLACE_CURRENT_GROUP_LAYER
} from '../types/mutation-types'

export const state = () => ({
  groupLayers: [],
  currentGroupLayer: null
})

export const actions = {
  async getGroupLayers ({ commit }, payload) {
    try {
      const { data } = await this.$groupLayerAPI.get(payload)
      commit('REPLACE_GROUP_LAYER', { groupLayers: data || [] })
    } catch (error) {
      throw error
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
  
  [REPLACE_CURRENT_GROUP_LAYER] (state, { groupLayer }) {
    state.currentGroupLayer = groupLayer
  },
}
