import {
  REPLACE_REPORTS,
  REPLACE_LOADING_REPORTS
} from '../types/mutation-types'

export const state = () => ({
  reports: [],
  loadingReports: false,
})

export const actions = {
  async getReports ({ commit }, payload) {
    commit('REPLACE_LOADING_REPORTS', { loading: true })

    try {
      const { data } = await this.$reportAPI.index(payload)
      commit('REPLACE_REPORTS', { reports: data.data })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_REPORTS', { loading: false })
    }
  }

}

export const mutations = {
  [REPLACE_REPORTS] (state, { reports }) {
    state.reports = reports
  },
  [REPLACE_LOADING_REPORTS] (state, { loading }) {
    state.loadingReports = loading
  },
}
