import {
  UPDATE_DATA_CONTEXT,
  UPDATE_CURRENT_ITEM_CONTEXT
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  currentItemContext: null
})

export const actions = {
  async getDataContext ({ commit }, payload) {
    try {
      const { data } = await this.$groupLayerAPI.get(payload)
      commit(UPDATE_DATA_CONTEXT, { dataContext: data || [] })
    } catch (error) {
      throw error
    }
  },
  
  updateCurrentItemContext ({ commit }, payload) {
    commit(UPDATE_CURRENT_ITEM_CONTEXT, payload)
  }
}

export const mutations = {
  [UPDATE_DATA_CONTEXT]: (state, { dataContext }) => state.dataContext = dataContext,
  
  [UPDATE_CURRENT_ITEM_CONTEXT]: (state, { groupLayer }) => state.currentItemContext = groupLayer
}
