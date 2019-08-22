export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `vectorial_layer/get_registered/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `vectorial_layer/register/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `layer/${payload.id}`,
      method: 'DELETE',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `layer/${payload.id}`,
      method: 'PUT',
      data: payload.data || {}
    })
  }
})
