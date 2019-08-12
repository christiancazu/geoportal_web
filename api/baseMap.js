export default $axios => ({
    index(payload = {}) {
    return $axios({
      url: `base_map/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
    create(payload = {}) {
    return $axios({
      url: `base_map/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `base_map/${payload.id}/`,
      method: 'DELETE',
      data: payload.data || {}
    })
  }
})
