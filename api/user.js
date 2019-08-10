export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `user/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getUser (payload = {}) {
    return $axios({
      url: `user/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  register (payload = {}) {
    return $axios({
      url: `register/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `user/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `user/${payload.id}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `user/${payload.id}/`,
      method: 'DELETE',
      data: payload.data || {}
    })
  },
  getProfile (payload = {}) {
    return $axios({
      url: `profile/info/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  putProfile (payload = {}) {
    return $axios({
      url: `profile/modify/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
})
