import { SATELITAL_IMAGE } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${SATELITAL_IMAGE}/`,
      method: 'GET',
      params: payload.params || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${SATELITAL_IMAGE}/${payload.id}/`,
      method: 'GET',
      params: payload.params || {}
    })
  },
  publish (payload = {}) {
    return $axios({
      url: `${SATELITAL_IMAGE}/publish/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
})
