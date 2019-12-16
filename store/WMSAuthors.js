import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PUBLISHED_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  OPEN_MODAL,
  SET_MODAL_VISIBLE,
  CLOSE_MODAL
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,
  modal: {
    folderRoot: 'components',
    folderName: 'fallback',
    component: 'Fallback',
    visible: false
  }
})

export const actions = {
  async createItemContext ({}, form) {
    await this.$WMSAuthorAPI.create(form)
  },

  async getDataContext ({ commit }) {
    const data = await this.$WMSAuthorAPI.get()
    commit(SET_DATA_CONTEXT, data)
  },

  async getItemContext ({ commit }, id) {
    const data = await this.$WMSAuthorAPI.getById(id)
    commit(SET_ITEM_CONTEXT, data)
  },

  async publishItemContext ({}, form) {
    await this.$WMSAuthorAPI.publish(form)
  },

  async updateItemContext ({}, form) {
    await this.$WMSAuthorAPI.update(form)
  },

  async deleteItemContext ({}, id) {
    await this.$WMSAuthorAPI.delete(id)
  },

  openModal: ({ commit }, payload) => {
    commit(OPEN_MODAL, payload)
    setTimeout(() => {
      commit(SET_MODAL_VISIBLE)
    }, 250)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => (state.dataContext = payload),

  [SET_ITEM_CONTEXT]: (state, payload) => (state.itemContext = payload),

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) =>
    (state.itemContext.isPublished = !payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload),

  [OPEN_MODAL]: (state, payload) => {
    state.modal.folderRoot = payload.folderRoot
    state.modal.folderName = payload.folderName
    state.modal.component = payload.component
  },

  [CLOSE_MODAL]: state => {
    state.modal.visible = false
    state.modal.folderRoot = 'components'
    state.modal.folderName = 'fallback'
    state.modal.component = 'Fallback'
  },

  [SET_MODAL_VISIBLE]: state => (state.modal.visible = true)
}
