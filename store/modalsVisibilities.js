import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_VISIBLE
} from '../types/mutation-types'

export const state = () => ({
  mainModal: {
    folderRoot: 'components',
    folderName: 'fallback',
    component: 'Fallback',
    visibility: false
  },
  secondModal: {
    folderRoot: 'components',
    folderName: 'fallback',
    component: 'Fallback',
    visibility: false
  },
  baseModal: {
    folderRoot: 'components',
    folderName: 'fallback',
    component: 'Fallback',
    visibility: false
  }
  // thirdModal: {
  //   component: 'Fallback',
  //   folderName: 'fallback',
  //   visibility: false
  // }
})

export const mutations = {
  [OPEN_MODAL]: (state, payload) => {
    state[payload.modalType].folderRoot = payload.folderRoot
    state[payload.modalType].folderName = payload.folderName
    state[payload.modalType].component = payload.component
  },

  [CLOSE_MODAL]: (state, payload) => {
    // state[payload].folderRoot = 'components'
    // state[payload].folderName = 'fallback'
    // state[payload].component = 'Fallback'
    state[payload].visibility = false
  },

  SET_COMPONENT_ON_BASE_MODAL: (state, payload) => {
    state.baseModal.folderRoot = payload.folderRoot
    state.baseModal.folderName = payload.folderName
    state.baseModal.component = payload.component
  },

  [SET_MODAL_VISIBLE]: (state, modalType) => (state[modalType].visibility = true)
}

export const actions = {
  openModal: ({ commit }, payload) => {
    commit(OPEN_MODAL, payload)
    setTimeout(() => {
      commit(SET_MODAL_VISIBLE, payload.modalType)
    }, 250)
  }
}
