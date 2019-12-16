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
    title: '',
    folderRoot: 'components',
    folderName: 'fallback',
    component: 'Fallback',
    visible: false
  }
})

export const actions = {
  async createItemContext ({}, form) {
    await this.$WMSCategoryAPI.create(form)
  },

  async getDataContext ({ commit }) {
    const data = await this.$WMSCategoryAPI.get()
    commit(SET_DATA_CONTEXT, data)
  },

  async getItemContext ({ commit }, id) {
    const data = await this.$WMSCategoryAPI.getById(id)
    commit(SET_ITEM_CONTEXT, data)
  },

  async publishItemContext ({}, form) {
    await this.$WMSCategoryAPI.publish(form)
  },

  async updateItemContext ({}, form) {
    await this.$WMSCategoryAPI.update(form)
  },

  async deleteItemContext ({}, id) {
    await this.$WMSCategoryAPI.delete(id)
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

  [SET_MODAL_VISIBLE]: state => (state.modal.visible = true),

  SET_DIALOG_TITLE: (state, payload) => {
    state.modal.title = payload
  }
}
