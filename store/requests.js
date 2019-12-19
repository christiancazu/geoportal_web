import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE
} from '@/types/mutations'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1
})

export const actions = {
  async getDataContext ({ commit }) {
    const data = await this.$requestAPI.getPending()
    commit(SET_DATA_CONTEXT, data)
  },
  async approveItemContext ({}, form) {
    await this.$requestAPI.approve(form)
  },
  async rejectItemContext ({}, form) {
    await this.$requestAPI.reject(form)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => (state.dataContext = payload),

  [SET_ITEM_CONTEXT]: (state, payload) => (state.itemContext = payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)
}
