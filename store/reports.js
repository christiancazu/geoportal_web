import {
  REPLACE_REPORTS,
  REPLACE_LOADING_REPORTS,
  REPLACE_SHOW_MODAL_VIEW_REPORT,
  REPLACE_CURRENT_REPORT
} from '../types/mutation-types'

export const state = () => ({
  reports: [],
  loadingReports: false,
  showModalViewReport: false,
  currentReport: null
})

export const actions = {
  async getReports ({ commit }, payload) {
    commit('REPLACE_LOADING_REPORTS', { loading: true })

    try {
      const { data } = await this.$reportAPI.index(payload)
      commit('REPLACE_REPORTS', { reports: data.data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_REPORTS', { loading: false })
    }
  },

  replaceShowModalViewReport ({ commit }, payload) {
    commit('REPLACE_SHOW_MODAL_VIEW_REPORT', payload)
  },

  replaceCurrentReport ({ commit }, payload) {
    commit('REPLACE_CURRENT_REPORT', payload)
  }

}

export const mutations = {
  [REPLACE_REPORTS] (state, { reports }) {
    state.reports = reports
  },
  [REPLACE_LOADING_REPORTS] (state, { loading }) {
    state.loadingReports = loading
  },
  [REPLACE_SHOW_MODAL_VIEW_REPORT] (state, { show }) {
    state.showModalViewReport = show
  },
  [REPLACE_CURRENT_REPORT] (state, { report }) {
    state.currentReport = report
  },
}
