export default $axios => ({
  refreshToken (payload = {}) {
    return $axios({
      url: 'auth/refresh/',
      method: 'POST',
      data: payload.data || {}
    })
  }
})
