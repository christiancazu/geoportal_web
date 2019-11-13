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
  async getDataContext ({ commit }) {
    const { data } = await this.$reportAPI.get()
    commit(SET_DATA_CONTEXT, { dataContext: data || [] })
  },

  async getItemContext ({ commit }, id) {
    const { data } = await this.$reportAPI.getById(id)
    commit(SET_ITEM_CONTEXT, { itemContext: data })
  },
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => (state.dataContext = dataContext),

  [SET_ITEM_CONTEXT]: (state, { itemContext }) => (state.itemContext = itemContext),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)
}
