export default $axios => ({
  get (payload = {}) {
    return $axios({
      url: `base_layer/`,
      method: 'GET',
      params: payload.params || {}
    })
  },
  getById (payload = {}) {
    return $axios({
      url: `base_layer/${payload.id}/`,
      method: 'GET',
      params: payload.params || {}
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
      url: `base_layer/${payload.id}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `base_layer/${payload.id}/`,
      method: 'DELETE',
      params: payload.params || {}
    })
  }
})
