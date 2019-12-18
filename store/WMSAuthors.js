import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PUBLISHED_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  OPEN_MODAL,
  SET_MODAL_VISIBLE,
  CLOSE_MODAL
} from '../types/mutation-types'

import {
  getDataContext,
  getItemContext,
  createItemContext,
  publishItemContext,
  updateItemContext,
  deleteItemContext,
  openMainModal
} from '@/use/store.actions'

import {
  setDataContext,
  setItemContext,
  setCurrentPageOnTable
} from '@/use/store.mutations'

const API = '$WMSAuthorAPI'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,

  modalMain: {
    title: 'modalMain',
    type: 'component',
    folderPath: 'fallback',
    name: 'Fallback',
    store: 'WMSCategories',
    visible: false
  }
})

export const actions = {
  createItemContext: createItemContext(API),

  getDataContext: getDataContext(API),

  getItemContext: getItemContext(API),

  publishItemContext: publishItemContext(API),

  updateItemContext: updateItemContext(API),

  deleteItemContext: deleteItemContext(API),

  openMainModal
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,

  [SET_ITEM_CONTEXT]: setItemContext,

  [SET_CURRENT_PAGE_ON_TABLE]: setCurrentPageOnTable,

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) => (state.itemContext.isPublished = !payload),

  [OPEN_MODAL]: (state, payload) => Object.assign(state.modalMain, payload),

  [CLOSE_MODAL]: state => {
    state.modalMain.visible = false
    state.modalMain.type = 'component'
    state.modalMain.folderPath = 'fallback'
    state.modalMain.name = 'Fallback'
  },

  [SET_MODAL_VISIBLE]: state => (state.modalMain.visible = true),

  SET_DIALOG_TITLE: (state, payload) => (state.modalMain.title = payload)
}
