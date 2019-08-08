export default $axios => ({
  getPending(payload = {}) {
    return $axios({
      url: `request/pending/`,
      method: 'GET',
      data: payload.data || {}
    })
  },
  getRejected(payload = {}) {
    return $axios({
      url: `request/rejected/`,
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
  rejected(payload = {}) {
    return $axios({
      url: `request/reject/`,
      method: 'POST',
      data: payload.data || {}
    })
  }
})
