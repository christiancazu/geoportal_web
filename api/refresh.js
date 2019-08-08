export default $axios => ({
    refreshToken(payload = {}) {
    return $axios({
      url: `refresh/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
})
