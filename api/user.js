export default $axios => ({
  index(payload = {}) {
    return $axios({
      url: `asistencia/obtener_resumen/`,
      method: 'GET',
      params: payload.params || {}
    })
  },

  create(payload = {}) {
    return $axios({
      url: `asistencia/registrar/`,
      method: 'POST',
      data: payload.data || {}
    })
  },
})
