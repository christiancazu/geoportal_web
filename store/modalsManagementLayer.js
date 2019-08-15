import {
  REPLACE_SHOW_MODAL_ADD_LAYER,
  REPLACE_SHOW_MODAL_ADD_BASE_MAP,
  REPLACE_SHOW_MODAL_ADD_GROUP_LAYER,
  REPLACE_SHOW_MODAL_EDIT_GROUP_LAYER
} from '../types/mutation-types'

export const state = () => ({
  showModalAddLayer: false,
  showModalAddBaseMap: false,
  showModalAddGroupLayer: false,
  showModalEditGroupLayer: false
})

export const actions = {
  replaceShowModalAddLayer ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_LAYER', payload)
  },
  replaceShowModalAddBaseMap ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_BASE_MAP', payload)
  },
  replaceShowModalAddGroupLayer ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_GROUP_LAYER', payload)
  },
  replaceShowModalEditGroupLayer ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_EDIT_GROUP_LAYER', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_MODAL_ADD_LAYER] (state, { show }) {
    state.showModalAddLayer = show
  },
  [REPLACE_SHOW_MODAL_ADD_BASE_MAP] (state, { show }) {
    state.showModalAddBaseMap = show
  },
  [REPLACE_SHOW_MODAL_ADD_GROUP_LAYER] (state, { show }) {
    state.showModalAddGroupLayer = show
  },
  [REPLACE_SHOW_MODAL_EDIT_GROUP_LAYER] (state, { show }) {
    state.showModalEditGroupLayer = show
  }
}