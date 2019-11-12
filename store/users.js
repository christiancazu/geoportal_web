import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1
})

export const actions = {
  async createItemContext ({}, form) {
    await this.$userAPI.create(form)
  },

  async getDataContext ({ commit }) {
    const { data } = await this.$userAPI.get()
    commit(SET_DATA_CONTEXT, { dataContext: data || [] })
  },

  async getItemContext ({ commit }, id) {
    const { data } = await this.$userAPI.getById(id)
    commit(SET_ITEM_CONTEXT, { itemContext: data })
  },

  async updateItemContext ({}, form) {
    await this.$userAPI.update(form)
  },

  async deleteItemContext ({}, id) {
    await this.$userAPI.delete(id)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => (state.dataContext = dataContext),

  [SET_ITEM_CONTEXT]: (state, { itemContext }) => (state.itemContext = itemContext),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)

}
