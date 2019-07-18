import {
  REPLACE_SHOW_PANEL_GEOVISOR
} from '../types/mutation-types'

export const state = () => ({
  showPanelGeovisor: false,
})

export const actions = {
  replaceShowPanelGeovisor({commit}, payload) {
    commit('REPLACE_SHOW_PANEL_GEOVISOR', payload)
  }
}

export const mutations = {
  [REPLACE_SHOW_PANEL_GEOVISOR](state, { show }) {
    state.showPanelGeovisor = show
  }
}