export default $axios => ({
    create(payload = {}) {
    return $axios({
      url: `register/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
})
