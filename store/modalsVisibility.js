import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../types/mutation-types'

export const state = () => ({
  modalAddWMSService: false,
  modalAddWMSCategory: false,
  modalAddWMSAuthor: false,
  // baselayers
  modalAddBaseLayer: false,
  modalEditBaseLayer: false
})

export const mutations = {
  [OPEN_MODAL]: (state, payload) => state[payload] = true,
  
  [CLOSE_MODAL]: (state, payload) => state[payload] = false
}