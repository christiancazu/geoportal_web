export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `group_layer/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `group_layer/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  edit (payload = {}) {
    return $axios({
      url: `group_layer/${payload.id}`,
      method: 'DELETE',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `group_layer/${payload.id}`,
      method: 'PUT',
      data: payload.data || {}
    })
  }
})
