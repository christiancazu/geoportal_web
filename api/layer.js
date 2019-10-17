import { LAYER } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${LAYER}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `${LAYER}/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `${LAYER}/${payload.id}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${LAYER}/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  }
})
