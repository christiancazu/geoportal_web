import {
  UPDATE_DATA_CONTEXT,
  UPDATE_CURRENT_ITEM_CONTEXT
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  currentItemContext: null
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
      commit(UPDATE_CURRENT_ITEM_CONTEXT, { itemContext: data })
    } 
    catch (error) {
      throw error
    }
  },

  async publishVectorialLayer ({}, payload) {
    try {
      await this.$vectorialLayerAPI.publish(payload)
    } 
    catch (error) {
      throw error
    }
  },

  async updateVectorialLayer ({}, payload) {
    try {
      await this.$vectorialLayerAPI.update(payload)
    } 
    catch (error) {
      throw error
    }
  },

  async deleteItemContext ({}, payload) {
    try {
      await this.$vectorialLayerAPI.delete(payload)
    } 
    catch (error) {
      throw error
    }
  },

  replaceCurrentLayer ({ commit }, payload) {
    commit(UPDATE_CURRENT_ITEM_CONTEXT, payload)
  }
}

export const mutations = {
  [UPDATE_DATA_CONTEXT]: (state, { dataContext }) => state.dataContext = dataContext,

  [UPDATE_CURRENT_ITEM_CONTEXT]: (state, { itemContext }) => state.currentItemContext = itemContext
}
