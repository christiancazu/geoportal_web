import Vue from 'vue'

export default ({ $axios, redirect }) => {
  $axios.onRequest((config) => {
    // console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 400) {
      redirect('/400')
    }

    if (code === 404) {
      Vue.prototype.$toasted.error('Error 404: Ruta no encontrada')
    }

    if (code === 422) {
      Vue.prototype.$toasted.error('Error 422: Errores de validación')
    }
  })
}
