import Vue from 'vue'

export default ({ $axios }) => {
  // timout for request in miliseconds
  $axios.defaults.timeout = 30000 // ms

  // $axios.onRequest(config => {})

  // $axios.onResponse(response => {})

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    // handle message error from server or default error message
    let errorMessage = ''
    switch (code) {
    case 'ECONNABORTED': // time expired for request
      errorMessage = Vue.prototype.$ERRORS.ERROR_TRY_LATER
      break
    case 401:
      // #TODO: logic for unauthorized request, need check middleware checkAuth
      // localStorage.clear();
      // errorMessage = Vue.prototype.$ERRORS.UNAUTHORIZED
      // Vue.prototype.$toasted.error(errorMessage)
      // eslint-disable-next-line no-undef
      redirect('/login')
      break
    case 404:
      errorMessage = Vue.prototype.$ERRORS.ROUTE_NOT_FOUND
      break
    case 422:
      errorMessage = Vue.prototype.$ERRORS.INVALID_DATA
      break
    default:
      errorMessage =
          typeof error.response !== 'undefined'
            ? error.response.data
            : Vue.prototype.$ERRORS.ERROR_TRY_LATER
    }
    Vue.prototype.$toasted.error(errorMessage)
  })
}
