import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  OPEN_MODAL,
  SET_MODAL_VISIBLE,
  SET_MODAL_TITLE,
  CLOSE_MODAL
} from '@/types/mutations'

import {
  setDynamicModal
} from '@/use/store.actions'

import {
  setDataContext,
  openModal,
  closeModal,
  setModalVisible,
  setModalTitle
} from '@/use/store.mutations'

const API = '$requestAPI'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,

  modalMain: {
    title: ' ',
    type: 'component',
    folderPath: 'fallback',
    name: 'Fallback',
    store: 'requests',
    visible: false
  }
})

export const actions = {
  async getDataContext ({ commit }) {
    const data = await this.$requestAPI.getPending()
    commit(SET_DATA_CONTEXT, data)
  },

  async approveItemContext ({}, form) {
    await this[API].approve(form)
  },
  async rejectItemContext ({}, form) {
    await this[API].reject(form)
  },

  setDynamicModal
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,

  [SET_ITEM_CONTEXT]: (state, payload) => (state.itemContext = payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload),

  [OPEN_MODAL]: openModal,

  [CLOSE_MODAL]: closeModal,

  [SET_MODAL_VISIBLE]: setModalVisible,

  [SET_MODAL_TITLE]: setModalTitle
}
