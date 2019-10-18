import { GEOREFERENCED_IMAGE } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${GEOREFERENCED_IMAGE}/`,
      method: 'GET',
      params: payload.params || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${GEOREFERENCED_IMAGE}/${payload.id}/`,
      method: 'GET',
      params: payload.params || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `${GEOREFERENCED_IMAGE}/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `${GEOREFERENCED_IMAGE}/${payload.id}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `${GEOREFERENCED_IMAGE}/${payload.id}/`,
      method: 'DELETE',
      params: payload.params || {}
    })
  }
})
