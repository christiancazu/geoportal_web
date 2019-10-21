import Vue from 'vue'
import { VECTORIAL_LAYER } from '@/config/endpoints'

export default ({ $axios, store }) => {
  // timout for request
  $axios.defaults.timeout = 30000

  $axios.onRequest((config) => {    
    if (config.method === 'get') {
      // getting the endpoint name to assign his own spinner loader state
      // const endpoints = config.url.replace(/config.baseURL|.$/, '')

      // switch (endpoints) {
      //   case VECTORIAL_LAYER:
      //     store.commit('spinners/ENABLE_LOADING_TABLE')
      //     break;
      
      //   default:
      //     break;
      // }
      store.commit('spinners/ENABLE_LOADING_TABLE')
    } else {
      store.commit('spinners/ENABLE_PROCESSING_FORM')
    }
  })

  $axios.onResponse((response) => {
    store.commit('spinners/DISABLE_PROCESSING_FORM')
    store.commit('spinners/DISABLE_LOADING_TABLE')
  })

  $axios.onError((error) => {
    store.commit('spinners/DISABLE_PROCESSING_FORM')
    store.commit('spinners/DISABLE_LOADING_TABLE')
    const code = parseInt(error.response && error.response.status)

    // handle message error from server or default error message
    let errorMessage = ""

    switch (code) {
      case 'ECONNABORTED': // time expired for request
        errorMessage = Vue.prototype.$ERRORS.ERROR_TRY_LATER
        break
      case 401:
        errorMessage = Vue.prototype.$ERRORS.TIME_EXPIRED_TRY_AGAIN
        redirect('/login')
        break
      case 404:
        errorMessage = Vue.prototype.$ERRORS.ROUTE_NOT_FOUND
        break
      case 422:
        errorMessage = Vue.prototype.$ERRORS.INVALID_DATA
        break
      default:
        errorMessage = typeof error.response !== 'undefined' ? error.response.data : Vue.prototype.$ERRORS.ERROR_TRY_LATER
    }
    Vue.prototype.$toasted.error(errorMessage)
  })
}
