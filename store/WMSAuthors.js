import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PUBLISHED_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  OPEN_MODAL,
  SET_MODAL_VISIBLE,
  SET_MODAL_TITLE,
  CLOSE_MODAL
} from '@/types/mutations'

import {
  getDataContext,
  getItemContext,
  createItemContext,
  publishItemContext,
  updateItemContext,
  deleteItemContext,
  setDynamicModal
} from '@/use/store.actions'

import {
  setDataContext,
  setItemContext,
  setCurrentPageOnTable,
  setPublishItemContext,
  openModal,
  closeModal,
  setModalVisible,
  setModalTitle
} from '@/use/store.mutations'

const API = '$WMSAuthorAPI'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,

  modalMain: {
    title: ' ',
    type: 'component',
    folderPath: 'fallback',
    name: 'Fallback',
    store: 'WMSAuthors',
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

  setDynamicModal
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,

  [SET_ITEM_CONTEXT]: setItemContext,

  [SET_CURRENT_PAGE_ON_TABLE]: setCurrentPageOnTable,

  [SET_PUBLISHED_ITEM_CONTEXT]: setPublishItemContext,

  [OPEN_MODAL]: openModal,

  [CLOSE_MODAL]: closeModal,

  [SET_MODAL_VISIBLE]: setModalVisible,

  [SET_MODAL_TITLE]: setModalTitle
}
