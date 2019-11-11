import { OPEN_MODAL, CLOSE_MODAL, SET_MODAL_VISIBILITY } from '../types/mutation-types'

export const state = () => ({
  mainModal: {
    component: 'Fallback',
    folderName: 'fallback',
    visibility: false
  },
  secondModal: {
    component: 'Fallback',
    folderName: 'fallback',
    visibility: false
  }
})

export const mutations = {
  [OPEN_MODAL]: (state, payload) => {
    state[payload.modalType].component = payload.component
    state[payload.modalType].folderName = payload.folderName
  },

  [CLOSE_MODAL]: (state, payload) => (state[payload].visibility = false),

  [SET_MODAL_VISIBILITY]: (state, modalType) => (state[modalType].visibility = true)
}

export const actions = {
  openModal: ({ commit }, payload) => {
    commit(OPEN_MODAL, payload)
    setTimeout(() => {
      commit(SET_MODAL_VISIBILITY, payload.modalType)
    }, 250)
  }
}
