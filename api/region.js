export default $axios => ({
  regions (payload = {}) {
    return $axios({
      url: 'region/',
      method: 'GET',
      params: payload.params || {}
    })
  },

  provinces (payload = {}) {
    return $axios({
      url: 'province/',
      method: 'GET',
      params: payload.params || {}
    })
  },

  districts (payload = {}) {
    return $axios({
      url: 'district/',
      method: 'GET',
      params: payload.params || {}
    })
  }
})
