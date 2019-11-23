import { USER } from '@/config/endpoints'


export default $axios => ({
  info (payload = {}) {
    return $axios({
      url: `${USER}/info/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
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
  getProfile (payload = {}) {
    return $axios({
      url: `${USER}/profile/`,
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
      url: `${USER}/profile_update/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `${USER}/${payload.id}/`,
      method: 'DELETE'
    })
  }
})
