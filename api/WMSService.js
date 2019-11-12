import { EXTERNAL_WMS_SERVICE } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_SERVICE}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_SERVICE}/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_SERVICE}/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  publish (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_SERVICE}/publish/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_SERVICE}/${payload.data.get('id')}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `${EXTERNAL_WMS_SERVICE}/${payload.id}/`,
      method: 'DELETE',
      data: payload.data || {}
    })
  }
})
