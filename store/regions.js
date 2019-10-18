import {
  REPLACE_REGIONS,
  REPLACE_LOADING_REGIONS,
  REPLACE_LOADING_PROVINCES,
  REPLACE_PROVINCES,
  REPLACE_LOADING_DISTRICTS,
  REPLACE_DISTRICTS,
} from '../types/mutation-types'

export const state = () => ({
  regions: [],
  loadingRegions: false,
  provinces: [],
  loadingProvinces: false,
  districts: [],
  loadingDistricts: false,
})

export const actions = {
  async getRegions ({ commit }, payload) {
    commit('REPLACE_LOADING_REGIONS', { loading: true })

    try {
      const { data } = await this.$regionAPI.regions(payload)
      commit('REPLACE_REGIONS', { regions: data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_REGIONS', { loading: false })
    }
  },

  async getProvinces ({ commit }, payload) {
    commit('REPLACE_LOADING_PROVINCES', { loading: true })

    try {
      const { data } = await this.$regionAPI.provinces(payload)
      commit('REPLACE_PROVINCES', { provinces: data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_PROVINCES', { loading: false })
    }
  },

  async getDistricts ({ commit }, payload) {
    commit('REPLACE_LOADING_DISTRICTS', { loading: true })

    try {
      const { data } = await this.$regionAPI.districts(payload)
      commit('REPLACE_DISTRICTS', { districts: data || [] })
    } catch (error) {
      if (!error.response) return
    } finally {
      commit('REPLACE_LOADING_DISTRICTS', { loading: false })
    }
  },

  replaceRegions ({ commit }, payload) {
    commit('REPLACE_REGIONS', payload)
  },

  replaceProvinces ({ commit }, payload) {
    commit('REPLACE_PROVINCES', payload)
  },

  replaceDistricts ({ commit }, payload) {
    commit('REPLACE_DISTRICTS', payload)
  }
}

export const mutations = {
  [REPLACE_REGIONS] (state, { regions }) {
    state.regions = regions
  },
  [REPLACE_LOADING_REGIONS] (state, { loading }) {
    state.loadingRegions = loading
  },
  [REPLACE_PROVINCES] (state, { provinces }) {
    state.provinces = provinces
  },
  [REPLACE_LOADING_PROVINCES] (state, { loading }) {
    state.loadingProvinces = loading
  },
  [REPLACE_DISTRICTS] (state, { districts }) {
    state.districts = districts
  },
  [REPLACE_LOADING_DISTRICTS] (state, { loading }) {
    state.loadingDistricts = loading
  }
}
