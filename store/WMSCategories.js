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
  async createItemContext ({}, { data }) {
    await this.$WMSCategoryAPI.create(data)
  },

  async getDataContext ({ commit }) {
    const data = await this.$WMSCategoryAPI.get()
    commit(SET_DATA_CONTEXT, data)
  },

  async getItemContext ({ commit }, { id }) {
    const data = await this.$WMSCategoryAPI.getById(id)
    commit(SET_ITEM_CONTEXT, data)
  },

  async publishItemContext ({}, { data }) {
    await this.$WMSCategoryAPI.publish(data)
  },

  async updateItemContext ({}, { data }) {
    await this.$WMSCategoryAPI.update(data)
  },

  async deleteItemContext ({}, { id }) {
    await this.$WMSCategoryAPI.delete(id)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => (state.dataContext = payload),

  [SET_ITEM_CONTEXT]: (state, payload) => (state.itemContext = payload),

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) => (state.itemContext.isPublished = !payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)
}
