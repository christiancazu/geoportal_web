export default $axios => ({
  getPending(payload = {}) {
    return $axios({
      url: `request/get_pending/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getRejected(payload = {}) {
    return $axios({
      url: `request/get_rejected/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  approve(payload = {}) {
    return $axios({
      url: `request/approve/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
  reject(payload = {}) {
    return $axios({
      url: `request/reject/`,
      method: 'POST',
      data: payload.data || {}
    })
  }
})
