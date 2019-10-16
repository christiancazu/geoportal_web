import {
  SHOW_MODAL_LAYER,
  CLOSE_MODAL_LAYER
} from '../types/mutation-types'

export const state = () => ({
  modalAddLayer: false,
  modalEditLayer: false,
  modalDeleteLayer: false,
  modalAddBaseMap: false,
  modalAddGroupLayer: false,
  modalEditGroupLayer: false,
  modalPublishRasterLayer: false
})

export const mutations = {
  
  [SHOW_MODAL_LAYER]: (state, payload) =>  state[payload] = true,

  [CLOSE_MODAL_LAYER]: (state, payload) =>  state[payload] = false,
  // [REPLACE_SHOW_MODAL_DELETE_LAYER] (state, { show }) {
  //   state.modalDeleteLayer = show
  // },
  // [REPLACE_SHOW_MODAL_ADD_BASE_MAP] (state, { show }) {
  //   state.modalAddBaseMap = show
  // },
  // [REPLACE_SHOW_MODAL_ADD_GROUP_LAYER] (state, { show }) {
  //   state.modalAddGroupLayer = show
  // },
  // [REPLACE_SHOW_MODAL_EDIT_GROUP_LAYER] (state, { show }) {
  //   state.modalEditGroupLayer = show
  // },
  // [REPLACE_SHOW_MODAL_PUBLISH_RASTER_LAYER] (state, { show }) {
  //   state.modalPublishRasterLayer = show
  // }
}