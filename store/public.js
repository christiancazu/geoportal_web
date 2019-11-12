import {
  REPLACE_REGIONS,
  REPLACE_PROVINCES,
  REPLACE_DISTRICTS
} from '../types/mutation-types'

export const state = () => ({
  regions: [],
  provinces: [],
  districts: [],
})

export const actions = {
  async getRegions ({ commit }) {
    const { data } = await this.$publicAPI.getRegions()
    commit(REPLACE_REGIONS, { regions: data })
  },

  async getProvinces ({ commit }, payload) {
    const { data } = await this.$publicAPI.getProvinces(payload)
    commit(REPLACE_PROVINCES, { provinces: data })
  },

  async getDistricts ({ commit }, payload) {
    const { data } = await this.$publicAPI.getDistricts(payload)
    commit(REPLACE_DISTRICTS, { districts: data })
  },

  replaceRegions ({ commit }, payload) {
    commit(REPLACE_REGIONS, payload)
  },

  replaceProvinces ({ commit }, payload) {
    commit(REPLACE_PROVINCES, payload)
  },

  replaceDistricts ({ commit }, payload) {
    commit(REPLACE_DISTRICTS, payload)
  }
}

export const mutations = {
  [REPLACE_REGIONS]: (state, { regions }) => (state.regions = regions),

  [REPLACE_PROVINCES]: (state, { provinces }) => (state.provinces = provinces),

  [REPLACE_DISTRICTS]: (state, { districts }) => (state.districts = districts)
}
