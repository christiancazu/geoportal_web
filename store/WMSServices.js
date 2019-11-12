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
    await this.$WMSServiceAPI.create(form)
  },

  async getDataContext ({ commit }) {
    const { data } = await this.$WMSServiceAPI.get()
    commit(SET_DATA_CONTEXT, { dataContext: data || [] })
  },

  async getItemContext ({ commit }, id) {
    const { data } = await this.$WMSServiceAPI.getById(id)
    commit(SET_ITEM_CONTEXT, { itemContext: data })
  },

  async publishItemContext ({}, form) {
    await this.$WMSServiceAPI.publish(form)
  },

  async updateItemContext ({}, form) {
    await this.$WMSServiceAPI.update(form)
  },

  async deleteItemContext ({}, id) {
    await this.$WMSServiceAPI.delete(id)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => (state.dataContext = dataContext),

  [SET_ITEM_CONTEXT]: (state, { itemContext }) => (state.itemContext = itemContext),

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) => (state.itemContext.isPublished = !payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)
}
