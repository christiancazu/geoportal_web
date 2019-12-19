import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PUBLISHED_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  SET_STRUCTURE_TREE
} from '@/types/mutations'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,
  structureTree: {}
})

export const actions = {
  async createItemContext ({}, form) {
    await this.$groupLayerAPI.create(form)
  },

  async getDataContext ({ commit }) {
    const data = await this.$groupLayerAPI.get()
    commit(SET_DATA_CONTEXT, data)
  },

  async getItemContext ({ commit }, id) {
    const data = await this.$groupLayerAPI.getById(id)
    commit(SET_ITEM_CONTEXT, data)
  },

  async publishItemContext ({}, form) {
    await this.$groupLayerAPI.publish(form)
  },

  async updateItemContext ({}, form) {
    await this.$groupLayerAPI.update(form)
  },

  async deleteItemContext ({}, id) {
    await this.$groupLayerAPI.delete(id)
  },

  async getStructureTree ({ commit }) {
    const data = await this.$groupLayerAPI.getStructure()
    commit(SET_STRUCTURE_TREE, data)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => (state.dataContext = payload),

  [SET_ITEM_CONTEXT]: (state, payload) => (state.itemContext = payload),

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) => (state.itemContext.isPublished = !payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload),

  [SET_STRUCTURE_TREE]: (state, payload) => (state.structureTree = payload)
}
