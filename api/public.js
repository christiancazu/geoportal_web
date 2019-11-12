import { PUBLIC } from '@/config/endpoints'

export default $axios => ({
  getRegions (payload = {}) {
    return $axios({
      url: `${PUBLIC}/region/`,
      method: 'GET',
      params: payload.params || {}
    })
  },

  getProvinces (payload = {}) {
    return $axios({
      url: `${PUBLIC}/province/`,
      method: 'GET',
      params: payload.params || {}
    })
  },

  getDistricts (payload = {}) {
    return $axios({
      url: `${PUBLIC}/district/`,
      method: 'GET',
      params: payload.params || {}
    })
  }
})
