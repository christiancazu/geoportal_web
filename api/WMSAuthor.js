import { EXTERNAL_WMS_AUTHOR } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_AUTHOR}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_AUTHOR}/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_AUTHOR}/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_AUTHOR}/${payload.data.get('id')}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_AUTHOR}/${payload.id}/`,
      method: 'DELETE',
      data: payload.data || {}
    })
  }
})
