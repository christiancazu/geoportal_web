import {
  REPLACE_SHOW_MODAL_ADD_USER,
  REPLACE_SHOW_MODAL_EDIT_USER,
  REPLACE_SHOW_MODAL_DELETE_USER,
  REPLACE_BREAKPOINTS
} from '../types/mutation-types'

export const state = () => ({
  showModalAddUser: false,
  showModalEditUser: false,
  showModalDeleteUser: false,
  breakpoints: null
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
  replaceBreakpoints({commit}, payload) {
    commit('REPLACE_BREAKPOINTS', payload)
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
  [REPLACE_BREAKPOINTS](state, { data }) {
    state.breakpoints = data
  }
}