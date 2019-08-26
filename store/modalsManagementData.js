import {
  REPLACE_SHOW_MODAL_ADD_GEOREFERENTIAL_IMAGE,
  REPLACE_SHOW_MODAL_EDIT_GEOREFERENTIAL_IMAGE,
} from '../types/mutation-types'

export const state = () => ({
  showModalAddGeoreferentialImage: false,
  showModalEditGeoreferentialImage: false,
})

export const actions = {
  replaceShowModalAddGeoreferentialImage ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_GEOREFERENTIAL_IMAGE', payload)
  },
  replaceShowModalEditGeoreferentialImage ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_EDIT_GEOREFERENTIAL_IMAGE', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_MODAL_ADD_GEOREFERENTIAL_IMAGE] (state, { show }) {
    state.showModalAddGeoreferentialImage = show
  },
  [REPLACE_SHOW_MODAL_EDIT_GEOREFERENTIAL_IMAGE] (state, { show }) {
    state.showModalEditGeoreferentialImage = show
  }
}