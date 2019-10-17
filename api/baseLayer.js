export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `base_layer/`,
      method: 'GET',
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `base_layer/${payload.id}`,
      method: 'GET',
    })
  },
  create (payload = {}) {
    return $axios({
      url: `base_layer/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  update (payload = {}) {
    return $axios({
      url: `base_layer/${payload.id}`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `base_layer/${payload.id}/`,
      method: 'DELETE',
      data: payload.data || {}
    })
  }
})
