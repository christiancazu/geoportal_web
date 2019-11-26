import { TEMPORAL } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${TEMPORAL}/`,
      method: 'GET',
      params: payload.params || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `${TEMPORAL}/${payload.id}/`,
      method: 'DELETE'
    })
  }
})
