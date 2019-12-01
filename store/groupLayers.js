import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PUBLISHED_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1
})

export const actions = {
  async createItemContext ({}, form) {
    await this.$groupLayerAPI.create(form)
  },

  async getDataContext ({ commit }) {
    const data = await this.$groupLayerAPI.get()
    commit(SET_DATA_CONTEXT, data)
  },

  async getItemContext ({ commit }, id) {
    const data = await this.$groupLayerAPI.getById(id)
    commit(SET_ITEM_CONTEXT, data)
  },

  async publishItemContext ({}, form) {
    await this.$groupLayerAPI.publish(form)
  },

  async updateItemContext ({}, form) {
    await this.$groupLayerAPI.update(form)
  },

  async deleteItemContext ({}, id) {
    await this.$groupLayerAPI.delete(id)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => (state.dataContext = payload),

  [SET_ITEM_CONTEXT]: (state, payload) => (state.itemContext = payload),

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) => (state.itemContext.isPublished = !payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)
}
