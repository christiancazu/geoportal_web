import {
  SET_REGIONS,
  SET_PROVINCES,
  SET_DISTRICTS
} from '@/types/mutations'

export const state = () => ({
  regions: [],
  provinces: [],
  districts: []
})

export const actions = {
  async getRegions ({ commit }) {
    const data = await this.$publicAPI.getRegions()
    commit(SET_REGIONS, data)
  },

  async getProvinces ({ commit }, regionId) {
    commit(SET_PROVINCES, { provinces: [] })
    commit(SET_DISTRICTS, { districts: [] })
    const data = await this.$publicAPI.getProvinces({region: regionId})
    commit(SET_PROVINCES, data)
  },

  async getDistricts ({ commit }, provinceId) {
    commit(SET_DISTRICTS, { districts: [] })
    const data = await this.$publicAPI.getDistricts({province: provinceId})
    commit(SET_DISTRICTS, data)
  },
}

export const mutations = {
  [SET_REGIONS]: (state, payload) => (state.regions = payload),

  [SET_PROVINCES]: (state, payload) => (state.provinces = payload),

  [SET_DISTRICTS]: (state, payload) => (state.districts = payload)
}
