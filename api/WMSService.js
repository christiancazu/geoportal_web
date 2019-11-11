export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: 'external_wms_service/',
      method: 'GET',
      data: payload.data || {}
    })
  },
  create (payload = {}) {
    return $axios({
      url: 'external_wms_service/',
      method: 'POST',
      data: payload.data || {}
    })
  },
  delete (payload = {}) {
    return $axios({
      url: `external_wms_service/${payload.id}`,
      method: 'DELETE',
      data: payload.data || {}
    })
  }
})
