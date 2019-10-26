import { VECTORIAL_LAYER } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${VECTORIAL_LAYER}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${VECTORIAL_LAYER}/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `${VECTORIAL_LAYER}/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  publish (payload = {}) {
    return $axios({
      url: `${VECTORIAL_LAYER}/publish/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `${VECTORIAL_LAYER}/${payload.id}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `${VECTORIAL_LAYER}/${payload.id}/`,
      method: 'DELETE',
      data: payload.data || {}
    })
  },
})
