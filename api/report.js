export default $axios => ({
  index (payload = {}) {
    return $axios({
      url: 'bug_report/',
      method: 'GET',
      data: payload.data || {}
    })
  }
})
