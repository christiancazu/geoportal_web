export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: `raster/get_all/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  publish (payload = {}) {
    return $axios({
      url: `raster/publish/`,
      method: 'PUT',
      data: payload.data || {}
    })
  }
})
