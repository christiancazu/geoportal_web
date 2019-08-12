import {
  REPLACE_SHOW_MODAL_ADD_USER,
  REPLACE_SHOW_MODAL_EDIT_USER,
  REPLACE_SHOW_MODAL_DELETE_USER,
  REPLACE_SHOW_MODAL_VIEW_PENDING_REQUEST
} from '../types/mutation-types'

export const state = () => ({
  showModalAddUser: false,
  showModalEditUser: false,
  showModalDeleteUser: false,
  showModalViewPendingRequest: false
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
  },
  replaceShowModalViewPendingRequest({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_VIEW_PENDING_REQUEST', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_MODAL_ADD_USER](state, { show }) {
    state.showModalAddUser = show
  },
  [REPLACE_SHOW_MODAL_EDIT_USER](state, { show }) {
    state.showModalEditUser = show
  },
  [REPLACE_SHOW_MODAL_DELETE_USER](state, { show }) {
    state.showModalDeleteUser = show
  },
  [REPLACE_SHOW_MODAL_VIEW_PENDING_REQUEST](state, { show }) {
    state.showModalViewPendingRequest = show
  }
}