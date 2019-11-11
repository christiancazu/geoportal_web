export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: 'external_wms_author/',
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: 'external_wms_author/',
      method: 'POST',
      data: payload.data || {}
    })
  }
})
