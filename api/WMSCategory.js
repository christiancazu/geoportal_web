export default $axios => ({
    index(payload = {}) {
    return $axios({
      url: `external_wms_category/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
    create(payload = {}) {
    return $axios({
      url: `external_wms_category/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
})
