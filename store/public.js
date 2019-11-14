import {
  SET_REGIONS,
  SET_PROVINCES,
  SET_DISTRICTS
} from '../types/mutation-types'

export const state = () => ({
  regions: [],
  provinces: [],
  districts: []
})

export const actions = {
  async getRegions ({ commit }) {
    const { data } = await this.$publicAPI.getRegions()
    commit(SET_REGIONS, { regions: data })
  },

  async getProvinces ({ commit }, payload) {
    commit(SET_PROVINCES, { provinces: [] })
    commit(SET_DISTRICTS, { districts: [] })
    const { data } = await this.$publicAPI.getProvinces({ region: payload })
    commit(SET_PROVINCES, { provinces: data })
  },

  async getDistricts ({ commit }, payload) {
    commit(SET_DISTRICTS, { districts: [] })
    const { data } = await this.$publicAPI.getDistricts({ province: payload })
    commit(SET_DISTRICTS, { districts: data })
  },
}

export const getters = {
  regions: (state) => state.regions
}

export const mutations = {
  [SET_REGIONS]: (state, { regions }) => (state.regions = regions),

  [SET_PROVINCES]: (state, { provinces }) => (state.provinces = provinces),

  [SET_DISTRICTS]: (state, { districts }) => (state.districts = districts)
}
