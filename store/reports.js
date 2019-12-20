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
  getDataContext,
  getItemContext,
  openModal
} from '@/use/store.actions'

import {
  setDataContext,
  setItemContext,
  setCurrentPageOnTable
} from '@/use/store.mutations'

const API = '$reportAPI'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,

  modalMain: {
    title: ' ',
    type: 'component',
    folderPath: 'fallback',
    name: 'Fallback',
    store: 'reports',
    visible: false
  }
})

export const actions = {
  getDataContext: getDataContext(API),

  getItemContext: getItemContext(API),

  openModal
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,

  [SET_ITEM_CONTEXT]: setItemContext,

  [SET_CURRENT_PAGE_ON_TABLE]: setCurrentPageOnTable,

  [OPEN_MODAL]: (state, { typeModal, component }) => Object.assign(state[typeModal], component),

  [CLOSE_MODAL]: (state, payload) => {
    state[payload].visible = false
    state[payload].title = ' '
    state[payload].type = 'component'
    state[payload].folderPath = 'fallback'
    state[payload].name = 'Fallback'
  },

  [SET_MODAL_VISIBLE]: (state, { typeModal }) => (state[typeModal].visible = true),

  [SET_MODAL_TITLE]: (state, { typeModal, dialogTitle }) => {
    state[typeModal].title = dialogTitle
  }
}
