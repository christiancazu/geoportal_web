import { BUG_REPORT } from '@/config/endpoints'

export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${BUG_REPORT}/`,
      method: 'GET',
      params: payload.params || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${BUG_REPORT}/${payload.id}/`,
      method: 'GET',
      params: payload.params || {}
    })
  },
})
