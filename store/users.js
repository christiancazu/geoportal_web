import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PROFILE,
  SET_CURRENT_PAGE_ON_TABLE
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  profile: {},
  currentPageOnTable: 1
})

export const actions = {
  async getUserInfo () {
    return await this.$userAPI.info()
  },

  async createItemContext ({ }, form) {
    await this.$userAPI.create(form)
  },

  async getDataContext ({ commit }) {
    const dataContext  = await this.$userAPI.get()
    console.warn(dataContext)
    commit(SET_DATA_CONTEXT, { dataContext })
  },

  async getItemContext ({ commit }, { id }) {
    console.warn(itemContext)
    const itemContext = await this.$userAPI.getById(id)
    commit(SET_ITEM_CONTEXT, { itemContext })
  },

  async getProfile ({ commit }) {
    const { data } = await this.$userAPI.getProfile()
    commit(SET_PROFILE, { profile: data })
  },

  async updateItemContext ({ }, form) {
    await this.$userAPI.update(form)
  },

  async updateProfile ({ }, form) {
    await this.$userAPI.updateProfile(form)
  },

  async deleteItemContext ({ }, id) {
    await this.$userAPI.delete(id)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => (state.dataContext = dataContext),

  [SET_ITEM_CONTEXT]: (state, { itemContext }) => (state.itemContext = itemContext),

  [SET_PROFILE]: (state, { profile }) => (state.profile = profile),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload),
  /* eslint-disable */
  ['SET_USER']: (state, payload) => {

  }
}
