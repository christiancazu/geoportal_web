export default $axios => ({
    index(payload = {}) {
    return $axios({
      url: `user/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
    register(payload = {}) {
    return $axios({
      url: `register/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
    create(payload = {}) {
    return $axios({
      url: `user/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
})
