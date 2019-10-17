import {
  SHOW_MODAL_WMS,
  HIDE_MODAL_WMS
} from '../types/mutation-types'

export const state = () => ({
  modalAddWMSService: false,
  modalAddWMSCategory: false,
  modalAddWMSAuthor: false,
})

export const mutations = {
  [SHOW_MODAL_WMS]: (state, payload) => state[payload] = true,
  
  [HIDE_MODAL_WMS]: (state, payload) => state[payload] = false
}