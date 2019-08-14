export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `layer/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `layer/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `layer/${payload.id}`,
      method: 'POST',
      data: payload.data || {}
    })
  },
})
