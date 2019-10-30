import {
  UPDATE_DATA_CONTEXT,
  UPDATE_ITEM_CONTEXT,
  UPDATE_PUBLISHED_ITEM_CONTEXT,
  UPDATE_CURRENT_PAGE_ON_TABLE
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1
})

export const actions = {
  async createItemContext ({ dispatch }, form) {
    try {
      await this.$vectorialLayerAPI.create(form)
      dispatch('getDataContext')
    } 
    catch (error) {
      throw error
    }
  },

  async getDataContext ({ commit }) {
    try {
      const { data } = await this.$vectorialLayerAPI.get()
      commit(UPDATE_DATA_CONTEXT, { dataContext: data || [] })
    } 
    catch (error) {
      throw error
    } 
  },

  async getItemContext ({ commit }, id) {
    try {
      const { data } = await this.$vectorialLayerAPI.getById(id)
      commit(UPDATE_ITEM_CONTEXT, { itemContext: data })
    } 
    catch (error) {
      throw error
    }
  },

  async publishItemContext ({ dispatch }, form) {
    try {
      await this.$vectorialLayerAPI.publish(form)
      dispatch('getDataContext')
    } 
    catch (error) {
      throw error
    }
  },

  async updateItemContext ({ dispatch }, form) {
    try {
      await this.$vectorialLayerAPI.update(form)
      dispatch('getDataContext')
    } 
    catch (error) {
      throw error
    }
  },

  async deleteItemContext ({}, id) {
    try {
      await this.$vectorialLayerAPI.delete(id)
    } 
    catch (error) {
      throw error
    }
  }
}

export const mutations = {
  [UPDATE_DATA_CONTEXT]: (state, { dataContext }) => state.dataContext = dataContext,

  [UPDATE_ITEM_CONTEXT]: (state, { itemContext }) => state.itemContext = itemContext,
  
  [UPDATE_PUBLISHED_ITEM_CONTEXT]: (state, payload) => state.itemContext.isPublished = !payload,

  [UPDATE_CURRENT_PAGE_ON_TABLE]: (state, payload) => state.currentPageOnTable = payload
}
