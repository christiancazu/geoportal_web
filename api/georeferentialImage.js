export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `raster_layer/get_all/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  publish (payload = {}) {
    return $axios({
      url: `raster_layer/publish/`,
      method: 'PUT',
      data: payload.data || {}
    })
  }
})