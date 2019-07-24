import {
  REPLACE_SHOW_MODAL_ADD_WMS_SERVICE,
  REPLACE_SHOW_MODAL_ADD_WMS_CATEGORY,
  REPLACE_SHOW_MODAL_ADD_WMS_AUTHOR
} from '../types/mutation-types'

export const state = () => ({
  showModalAddWMSService: false,
  showModalAddWMSCategory: false,
  showModalAddWMSAuthor: false,
})

export const actions = {
  replaceShowModalAddWMSService ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_WMS_SERVICE', payload)
  },
  replaceShowModalAddWMSCategory ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_WMS_CATEGORY', payload)
  },
  replaceShowModalAddWMSAuthor ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_WMS_AUTHOR', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_MODAL_ADD_WMS_SERVICE] (state, { show }) {
    state.showModalAddWMSService = show
  },
  [REPLACE_SHOW_MODAL_ADD_WMS_CATEGORY] (state, { show }) {
    state.showModalAddWMSCategory = show
  },
  [REPLACE_SHOW_MODAL_ADD_WMS_AUTHOR] (state, { show }) {
    state.showModalAddWMSAuthor = show
  }
}