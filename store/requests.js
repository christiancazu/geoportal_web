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
    const { data } = await this.$requestAPI.getPending()
    commit(SET_DATA_CONTEXT, { dataContext: data || [] })
  },
  async approveItemContext ({ }, payload) {
    await this.$requestAPI.approve(payload)
  },
  async rejectItemContext ({ }, payload) {
    await this.$requestAPI.reject(payload)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => (state.dataContext = dataContext),

  [SET_ITEM_CONTEXT]: (state, { itemContext }) => (state.itemContext = itemContext),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)

}
