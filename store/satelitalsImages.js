import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  SET_PUBLISHED_ITEM_CONTEXT
} from '../types/mutation-types'
export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1
})

export const actions = {
  async getDataContext ({ commit }) {
    const { data } = await this.$satelitalImageAPI.get()
    commit(SET_DATA_CONTEXT, { dataContext: data || [] })
  },

  async getItemContext ({ commit }, id) {
    const { data } = await this.$satelitalImageAPI.getById(id)
    commit(SET_ITEM_CONTEXT, { itemContext: data })
  },

  async publishItemContext ({}, form) {
    await this.$satelitalImageAPI.publish(form)
  },
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => (state.dataContext = dataContext),

  [SET_ITEM_CONTEXT]: (state, { itemContext }) => (state.itemContext = itemContext),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload),

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) => (state.itemContext.isPublished = !payload)
}
