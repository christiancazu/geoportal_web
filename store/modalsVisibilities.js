import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../types/mutation-types'

export const state = () => ({
  // users
  modalAddUser: false,
  modalEditUser: false,
  modalViewPendingRequest: false,
  // serviceswms
  modalAddWMSService: false,
  modalAddWMSCategory: false,
  modalAddWMSAuthor: false,
  // baselayers
  modalAddBaseLayer: false,
  modalEditBaseLayer: false,
  // vectorial
  modalAddLayer: false,
  modalEditLayer: false,
  modalDeleteLayer: false,
  // group layer
  modalAddGroupLayer: false,
  modalEditGroupLayer: false,
  modalPublishRasterLayer: false,
  // GeoreferentialImage
  modalAddGeoreferentialImage: false,
  modalEditGeoreferentialImage: false,
  // reports
  modalViewReport: false
})

export const mutations = {
  [OPEN_MODAL]: (state, payload) => state[payload] = true,

  [CLOSE_MODAL]: (state, payload) => state[payload] = false
}