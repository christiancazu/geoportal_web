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
})
