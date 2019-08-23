import Vue from 'vue'

export default ({ $axios, redirect }) => {
  $axios.onRequest((config) => {
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
    const code = parseInt(error.response && error.response.status)

    // if (code === 401) {
    //   redirect('/login')
    // }

    if (code === 404) {
      Vue.prototype.$toasted.error('Error 404: Ruta no encontrada')
    }

    if (code === 422) {
      Vue.prototype.$toasted.error('Error 422: Errores de validación')
    }
  })
}
