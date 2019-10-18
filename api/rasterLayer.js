import { RASTER_LAYER } from '@/config/endpoints'

export default $axios => ({
    get (payload = {}) {
      return $axios({
        url: `${RASTER_LAYER}/`,
        method: 'GET'
      })
    },
    getById (payload = {}) {
      return $axios({
        url: `${RASTER_LAYER}/${payload.id}/`,
        method: 'GET'
      })
    },
    create (payload = {}) {
      return $axios({
        url: `${RASTER_LAYER}/`,
        method: 'POST',
        data: payload.data || {}
      })
    },
    publish (payload = {}) {
      return $axios({
        url: `${RASTER_LAYER}/publish`,
        method: 'POST',
        data: payload.data || {}
      })
    },
    update (payload = {}) {
      return $axios({
        url: `${RASTER_LAYER}/${payload.id}/`,
        method: 'PUT',
        data: payload.data || {}
      })
    },
    delete (payload = {}) {
      return $axios({
        url: `${RASTER_LAYER}/${payload.id}/`,
        method: 'DELETE'
      })
    },
  
})
