export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `vectorial/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `vectorial/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  edit (payload = {}) {
    return $axios({
      url: `vectorial/${payload.id}/`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  data (payload = {}) {
    return $axios({
      url: `vectorial/${payload.id}/`,
      method: 'GET',
      data: payload.data || {}
    })
  }
})
