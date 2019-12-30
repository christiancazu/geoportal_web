import {
  SET_DATA_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE
} from '@/types/mutations'

export const state = () => ({
  dataContext: [],
  currentPageOnTable: 1
})

export const actions = {
  async getDataContext ({ commit }) {
    const data = await this.$requestAPI.getRejected()
    commit(SET_DATA_CONTEXT, data)
  },

  async approveItemContext ({}, id) {
    await this.$requestAPI.approve(id)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => (state.dataContext = payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)
}
