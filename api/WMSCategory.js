import { EXTERNAL_WMS_CATEGORY } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_CATEGORY}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_CATEGORY}/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_CATEGORY}/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_CATEGORY}/${payload.data.get('id')}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_CATEGORY}/${payload.id}/`,
      method: 'DELETE',
      data: payload.data || {}
    })
  }
})
