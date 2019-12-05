import Vue from 'vue'

import { AUTH_STRATEGY } from '@/config/constants'

export default async ({ $axios, redirect, app }) => {
  // $axios.defaults.timeout = 30000 // timeout for request in miliseconds

  $axios.onRequest((/*config*/) => {
    if (app.$auth.getToken(AUTH_STRATEGY)) {
      $axios.setToken(app.$auth.getToken(AUTH_STRATEGY))
    }
  })

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
      errorMessage = Vue.prototype.$ERRORS.UNAUTHORIZED
      // deleting tokens
      $axios.setToken(null)
      app.$auth.setToken(AUTH_STRATEGY, null)
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
