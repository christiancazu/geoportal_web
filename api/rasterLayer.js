export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `raster_layer/get_all/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  put (payload = {}) {
    return $axios({
      url: `raster_layer/publish/${payload.id}`,
      method: 'PUT',
      data: payload.data || {}
    })
  }
})
