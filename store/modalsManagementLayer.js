import {
  REPLACE_SHOW_MODAL_ADD_LAYER,
  REPLACE_SHOW_MODAL_ADD_BASE_MAP
} from '../types/mutation-types'

export const state = () => ({
  showModalAddLayer: false,
  showModalAddBaseMap: false
})

export const actions = {
  replaceShowModalAddLayer({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_LAYER', payload)
  },
  replaceShowModalAddBaseMap({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_BASE_MAP', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_MODAL_ADD_LAYER](state, { show }) {
    state.showModalAddLayer = show
  },
  [REPLACE_SHOW_MODAL_ADD_BASE_MAP](state, { show }) {
    state.showModalAddBaseMap = show
  }
}