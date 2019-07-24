import {
  REPLACE_SHOW_MODAL_ADD_WMS_SERVICE,
} from '../types/mutation-types'

export const state = () => ({
  showModalAddWMSService: false,
})

export const actions = {
  replaceShowModalAddWMSService({commit}, payload) {
    commit('REPLACE_SHOW_MODAL_ADD_WMS_SERVICE', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_MODAL_ADD_WMS_SERVICE](state, { show }) {
    state.showModalAddWMSService = show
  }
}