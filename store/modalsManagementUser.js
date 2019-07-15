import {
  REPLACE_SHOW_MODAL_ADD_USER
} from '../types/mutation-types'

export const state = () => ({
  showModalAddUser: false,
  showModalDeleteUser: false
})

export const actions = {
  replaceShowModalAddUser({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_USER', payload)
  },
  replaceShowModalEditUser({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_EDIT_USER', payload)
  },
  replaceShowModalDeleteUser({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_DELETE_USER', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_MODAL_ADD_USER](state, { show }) {
    state.showModalAddUser = show
  },
  [REPLACE_SHOW_MODAL_EDIT_USER](state, { show }) {
    state.showModalAddUser = show
  },
  [REPLACE_SHOW_MODAL_DELETE_USER](state, { show }) {
    state.showModalAddUser = show
  }
}