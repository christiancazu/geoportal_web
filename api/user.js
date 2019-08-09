export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `user/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getUser (payload = {}) {
    const id = this.payload.id
    return $axios({
      url: `user/${id}/`,
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
    const id = this.payload.id
    return $axios({
      url: `user/${id}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    const id = this.payload.id
    return $axios({
      url: `user/${id}/`,
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
