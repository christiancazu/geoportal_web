import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_DYNAMIC_MAIN_MODAL,
  SET_DYNAMIC_SECOND_MODAL,
  SET_MODAL_MAIN_FOLDER_NAME,
  SET_MODAL_SECOND_FOLDER_NAME
} from "../types/mutation-types";

export const state = () => ({
  // current dynamic main modal to display
  mainModal: "ModalAddVectorialLayer",
  secondModal: "ModalAddVectorialLayer",
  // current modals folder name
  modalMainFolderName: "layers",
  modalSecondFolderName: "layers",
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
});

export const mutations = {
  [OPEN_MODAL]: (state, payload) => (state[payload] = true),

  [CLOSE_MODAL]: (state, payload) => (state[payload] = false),

  [SET_DYNAMIC_MAIN_MODAL]: (state, payload) => (state.mainModal = payload),

  [SET_DYNAMIC_SECOND_MODAL]: (state, payload) => (state.secondModal = payload),

  [SET_MODAL_MAIN_FOLDER_NAME]: (state, payload) =>
    (state.modalMainFolderName = payload),

  [SET_MODAL_SECOND_FOLDER_NAME]: (state, payload) =>
    (state.modalSecondFolderName = payload)
};
