import {
  SHOW_MODAL_ADD_WMS,
  HIDE_MODAL_ADD_WMS
} from '../types/mutation-types'

export const state = () => ({
  modalAddWMSService: false,
  modalAddWMSCategory: false,
  modalAddWMSAuthor: false,
})

export const mutations = {
  [SHOW_MODAL_ADD_WMS]: (state, payload) => state[payload] = true,
  
  [HIDE_MODAL_ADD_WMS]: (state, payload) => state[payload] = false
}