import { GROUP_LAYER } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${GROUP_LAYER}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${GROUP_LAYER}/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `${GROUP_LAYER}/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `${GROUP_LAYER}/${payload.data.get('id')}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `${GROUP_LAYER}/${payload.id}/`,
      method: 'DELETE',
      data: payload.data || {}
    })
  }
})
