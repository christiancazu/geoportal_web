import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PUBLISHED_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  OPEN_MODAL,
  SET_MODAL_VISIBLE,
  CLOSE_MODAL
} from '@/types/mutations'

import {
  getDataContext,
  getItemContext,
  createItemContext,
  publishItemContext,
  updateItemContext,
  deleteItemContext,
  openModal
} from '@/use/store.actions'

import {
  setDataContext,
  setItemContext,
  setCurrentPageOnTable
} from '@/use/store.mutations'

const API = '$WMSServiceAPI'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,

  modalMain: {
    title: ' ',
    type: 'component',
    folderPath: 'fallback',
    name: 'Fallback',
    store: 'WMSServices',
    visible: false
  },
  modalInner: {
    title: ' ',
    type: 'component',
    folderPath: 'fallback',
    name: 'Fallback',
    store: 'WMSServices',
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

  openModal,
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,

  [SET_ITEM_CONTEXT]: setItemContext,

  [SET_CURRENT_PAGE_ON_TABLE]: setCurrentPageOnTable,

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) =>
    (state.itemContext.isPublished = !payload),

  [OPEN_MODAL]: (state, { typeModal, component }) => Object.assign(state[typeModal], component),

  [CLOSE_MODAL]: (state, payload) => {
    state[payload].visible = false
    state[payload].type = 'component'
    state[payload].folderPath = 'fallback'
    state[payload].name = 'Fallback'
  },

  [SET_MODAL_VISIBLE]: (state, { typeModal }) => (state[typeModal].visible = true),

  SET_DIALOG_TITLE: (state, { typeModal, dialogTitle}) => {
    state[typeModal].title = dialogTitle
  }
}
