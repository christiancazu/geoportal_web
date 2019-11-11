export const email = [
  {
    required: true,
    message: 'Ingrese su nombre de usuario'
  }
]

export const password = [
  {
    required: true,
    message: 'Ingrese su contraseña'
  }
]

export const title = [
  {
    required: true,
    message: 'El nombre de usuario es requerido'
  }
]

export const groupLayerId = [
  {
    required: true,
    message: 'Seleccione un Grupo de capa'
  }
]

export const order = [
  {
    required: true,
    type: 'number',
    message: ' '
  }
]

export const url = [
  {
    required: true,
    message: 'La url del mapa base es requrido'
  }
]

/*eslint-disable */
export const name = [
  {
    required: true,
    // pattern: /^[z0-9\s.,\/#!$%\^&\*;:{}=\-+'´`~()”“"…]+$/g,
    validator: (rule, value, callback) => {
      let text = value.split('')
      let itContainsBlanks = text.every(val => /[a-zA-Z0-9_]/g.test(val))
      if (!itContainsBlanks) {
        return callback(new Error("Solo se admite letras y subguion '_'"))
      }
      callback()
    }
  }
]

// form create user

export const username = [{
  required: true,
  message: 'El nombre de usuario es requerido'
}]
export const lastName = [{
  required: true,
  message: 'El nombre es requerido'
}]
export const lastNameAditional = [{
  required: true,
  message: 'El segundo apellidos es requerido'
}]
export const region = [{
  required: true,
  message: 'Seleccione su región'
}]
export const districtId = [{
  required: true,
  validator: (rule, value, callback) => {
    if (!this.form.province) {
      return callback(new Error('Seleccione su Distrito'))
    }
    callback()
  }
}]
export const province = [{
  required: true,
  validator: (rule, value, callback) => {
    if (!this.form.region) {
      return callback(new Error('Seleccione su Provincia'))
    }
    callback()
  }
}]
export const institute = [{
  required: true,
  message: 'La institución es requerida'
}]
export const subject = [{
  required: true,
  min: 10,
  message: 'Detalle el motivo para acceder al Geoportal UNAT'
}]