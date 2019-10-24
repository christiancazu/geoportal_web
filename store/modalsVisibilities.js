import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../types/mutation-types'

export const state = () => ({
  // users
  modalAddUser: false,
  modalEditUser: false,
  modalViewPendingRequest: false,
  // services wms
  modalAddWMSService: false,
  modalAddWMSCategory: false,
  modalAddWMSAuthor: false,
  // base layers
  modalAddBaseLayer: false,
  modalEditBaseLayer: false,
  // vectorial layers
  modalAddVectorialLayer: false,
  modalEditVectorialLayer: false,
  // raster layers
  modalAddRasterLayer: false,
  modalEditRasterLayer: false,
  // group layers
  modalAddGroupLayer: false,
  modalEditGroupLayer: false,
  modalPublishRasterLayer: false,
  // Georeferential image
  modalAddGeoreferencedImage: false,
  modalEditGeoreferencedImage: false,
  // reports
  modalViewReport: false
})

export const mutations = {
  [OPEN_MODAL]: (state, payload) => state[payload] = true,

  [CLOSE_MODAL]: (state, payload) => state[payload] = false
}