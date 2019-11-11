import { USER } from '@/config/endpoints'


export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `${USER}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `${USER}/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `${USER}/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `${USER}/${payload.data.get('id')}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  }
})
