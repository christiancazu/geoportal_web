import {
  REPLACE_REPORTS,
  REPLACE_LOADING_REPORTS,
  REPLACE_CURRENT_REPORT
} from '../types/mutation-types'

export const state = () => ({
  reports: [],
  loadingReports: false,
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
  [REPLACE_CURRENT_REPORT] (state, { report }) {
    state.currentReport = report
  },
}
