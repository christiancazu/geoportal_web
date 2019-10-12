import Vue from 'vue'
import { ERRORS } from '~/config/messages'

export default ({ $axios, redirect, store }) => {
  $axios.defaults.timeout = 30000

  $axios.onRequest((config) => {
    const token = store.$auth.getToken('local')

    if (token) {
      config.headers.Authorization = `${token}`
    }

    // console.log('Making request to ' + config.url)
  })

  $axios.onResponse((response) => {
    const code = response.status
    const status = !response.data.status
    const message = response.data.message

    if (code === 200 && status) {
      Vue.prototype.$toasted.info(message)
    }
  })

  $axios.onError((error) => {
    // time expired for request
    if (error.code === 'ECONNABORTED') {
      Vue.prototype.$toasted.error(ERRORS.ERROR_TRY_LATER)
      return
    }

    const code = parseInt(error.response && error.response.status)

    // if (code === 401) {
    //   redirect('/login')
    // }

    if (code === 404) {
      Vue.prototype.$toasted.error(ERRORS.ROUTE_NOT_FOUND)
    }

    if (code === 422) {
      Vue.prototype.$toasted.error(ERRORS.INVALID_DATA)
    }
  })
}
