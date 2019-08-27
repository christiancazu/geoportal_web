export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `vectorial/get_registered/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: `vectorial/register/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  edit (payload = {}) {
    return $axios({
      url: `vectorial/${payload.id}`,
      method: 'PUT',
      data: payload.data || {}
    })
  },
  data (payload = {}) {
    return $axios({
      url: `vectorial/${payload.id}`,
      method: 'PUT',
      data: payload.data || {}
    })
  }
})
