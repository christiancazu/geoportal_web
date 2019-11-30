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

  async createItemContext ({ }, { data }) {
    await this.$userAPI.create(data)
  },

  async getDataContext ({ commit }) {
    const data = await this.$userAPI.get()
    commit(SET_DATA_CONTEXT, data)
  },

  async getItemContext ({ commit }, { id }) {
    const data = await this.$userAPI.getById(id)
    commit(SET_ITEM_CONTEXT, data)
  },

  async getProfile ({ commit }) {
    const data = await this.$userAPI.getProfile()
    commit(SET_PROFILE, data)
  },

  async updateItemContext ({ }, { data }) {
    await this.$userAPI.update(data)
  },

  async deleteItemContext ({ }, { id }) {
    await this.$userAPI.delete(id)
  },

  async updateProfile ({ }, { data }) {
    await this.$userAPI.updateProfile(data)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => (state.dataContext = payload),

  [SET_ITEM_CONTEXT]: (state, payload) => (state.itemContext = payload),

  [SET_PROFILE]: (state, payload) => (state.profile = payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload),

}
