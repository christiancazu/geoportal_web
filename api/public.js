import { PUBLIC } from '@/config/endpoints'

export default $axios => ({
  getRegions (payload = {}) {
    return $axios({
      url: `${PUBLIC}/region/`,
      method: 'GET',
      params: payload || {}
    })
  },

  getProvinces (payload = {}) {
    return $axios({
      url: `${PUBLIC}/province/`,
      method: 'GET',
      params: payload || {}
    })
  },

  getDistricts (payload = {}) {
    return $axios({
      url: `${PUBLIC}/district/`,
      method: 'GET',
      params: payload || {}
    })
  }
})
