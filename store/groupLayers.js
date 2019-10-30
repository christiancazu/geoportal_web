import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  currentItemContext: null
})

export const actions = {
  async getDataContext ({ commit }, payload) {
    try {
      const { data } = await this.$groupLayerAPI.get(payload)
      commit(SET_DATA_CONTEXT, { dataContext: data || [] })
    } catch (error) {
      throw error
    }
  },
  
  updateCurrentItemContext ({ commit }, payload) {
    commit(SET_ITEM_CONTEXT, payload)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => state.dataContext = dataContext,
  
  [SET_ITEM_CONTEXT]: (state, { groupLayer }) => state.currentItemContext = groupLayer
}
