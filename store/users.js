import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  OPEN_MODAL,
  SET_MODAL_VISIBLE,
  SET_MODAL_TITLE,
  CLOSE_MODAL,
  SET_PROFILE
} from '@/types/mutations'

import {
  getDataContext,
  getItemContext,
  createItemContext,
  updateItemContext,
  deleteItemContext,
  setDynamicModal
} from '@/use/store.actions'

import {
  setDataContext,
  setItemContext,
  setCurrentPageOnTable,
  openModal,
  closeModal,
  setModalVisible,
  setModalTitle
} from '@/use/store.mutations'

const API = '$userAPI'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,
  profile: {},

  modalMain: {
    title: ' ',
    type: 'component',
    folderPath: 'fallback',
    name: 'Fallback',
    store: 'users',
    visible: false
  }
})

export const actions = {
  createItemContext: createItemContext(API),

  getDataContext: getDataContext(API),

  getItemContext: getItemContext(API),

  updateItemContext: updateItemContext(API),

  deleteItemContext: deleteItemContext(API),

  async getUserInfo () {
    return await this.$userAPI.info()
  },

  async getProfile ({ commit }) {
    const data = await this.$userAPI.getProfile()
    commit(SET_PROFILE, data)
  },

  async updateProfile ({}, form) {
    await this.$userAPI.updateProfile(form)
  },

  async logout () {
    await this.$userAPI.logout()
  },

  setDynamicModal
}

export const mutations = {
  [SET_DATA_CONTEXT]: setDataContext,

  [SET_ITEM_CONTEXT]: setItemContext,

  [SET_CURRENT_PAGE_ON_TABLE]: setCurrentPageOnTable,

  [OPEN_MODAL]: openModal,

  [CLOSE_MODAL]: closeModal,

  [SET_MODAL_VISIBLE]: setModalVisible,

  [SET_MODAL_TITLE]: setModalTitle,

  [SET_PROFILE]: (state, payload) => (state.profile = payload)
}
