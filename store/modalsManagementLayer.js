import {
  REPLACE_SHOW_MODAL_ADD_LAYER,
  REPLACE_SHOW_MODAL_EDIT_LAYER,
  REPLACE_SHOW_MODAL_DELETE_LAYER,
  REPLACE_SHOW_MODAL_ADD_BASE_MAP
} from '../types/mutation-types'

export const state = () => ({
  showModalAddLayer: false,
  showModalEditLayer: false,
  showModalDeleteLayer: false,
  showModalAddBaseMap: false
})

export const actions = {
  replaceShowModalAddLayer({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_LAYER', payload)
  },
  replaceShowModalEditLayer({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_EDIT_LAYER', payload)
  },
  replaceShowModalDeleteLayer({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_DELETE_LAYER', payload)
  },
  replaceShowModalAddBaseMap({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_BASE_MAP', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_MODAL_ADD_LAYER](state, { show }) {
    state.showModalAddLayer = show
  },
  [REPLACE_SHOW_MODAL_EDIT_LAYER](state, { show }) {
    state.showModalEditLayer = show
  },
  [REPLACE_SHOW_MODAL_DELETE_LAYER](state, { show }) {
    state.showModalDeleteLayer = show
  },
  [REPLACE_SHOW_MODAL_ADD_BASE_MAP](state, { show }) {
    state.showModalAddBaseMap = show
  }
}