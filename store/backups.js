import {
  REPLACE_BACKUPS,
  REPLACE_LOADING_BACKUPS,
  REPLACE_CURRENT_BACKUP
} from '../types/mutation-types'

export const state = () => ({
  backups: [],
  loadingBackups: false,
  currentBackup: null,
})

export const actions = {
  async getReports ({ commit }, payload) {
    commit('REPLACE_LOADING_BACKUPS', { loading: true })

    try { //improve api
      const { data } = await this.$reportAPI.index(payload)
      commit('REPLACE_BACKUPS', { backups: data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_BACKUPS', { loading: false })
    }
  },
  replaceCurrentBakcup ({ commit }, payload) {
    commit('REPLACE_CURRENT_BACKUP', payload)
  }
}

export const mutations = {
  [REPLACE_BACKUPS] (state, { backups }) {
    state.backups = backups
  },
  [REPLACE_LOADING_BACKUPS] (state, { loading }) {
    state.loadingBackups = loading
  },
  [REPLACE_CURRENT_BACKUP] (state, { backup }) {
    state.currentBackup = backup
  }
}
