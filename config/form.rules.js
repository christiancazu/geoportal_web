/*eslint-disable */
export const email = [
  {
    required: true,
    message: 'La dirección de correo electrónico es requerida'
  },
  {
    validator: (rule, value, callback) => {
      const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailRegEx.test(value)) {
        return callback(new Error("Debe indicar un email válido"))
      }
      callback()
    },
    trigger: 'blur'
  }
]

export const password = [
  {
    required: true,
    message: 'La contraseña es requerida'
  }
]

export const title = [
  {
    required: true,
    message: 'El título es requerido'
  }
]

export const groupLayerId = [
  {
    required: true,
    message: 'Seleccione un grupo de capa'
  }
]

export const order = [
  {
    required: true,
    type: 'number',
    message: 'Debe indicar un valor numérico'
  }
]

export const url = [
  {
    required: true,
    message: 'La url del mapa base es requerido'
  }
]

export const authorId = [
  {
    required: true,
    message: 'Seleccione un autor'
  }
]

export const categoryId = [
  {
    required: true,
    message: 'Seleccione una categoría'
  }
]

export const districtId = [
  {
    required: true,
    message: 'El distrito es requerido'
  }
]

export const name = name => [
  {
    required: true,
    message: `El nombre de ${name} es requerido`
  }
]

export const shapeFile = [
  {
    required: true,
    message: 'El archivo es requerido'
  }
]

export const rasterFile = [
  {
    required: true,
    message: 'El archivo es requerido'
  }
]

export const image = [
  {
    required: true,
    message: 'El archivo es requerido'
  }
]

export const nameAlpha = [
  {
    required: true,
    message: 'El nombre es requerido'
  },
  {
    // pattern: /^[z0-9\s.,\/#!$%\^&\*;:{}=\-+'´`~()”“"…]+$/g,
    validator: (rule, value, callback) => {
      let text = value.split('')
      let itContainsBlanks = text.every(val => /^\w*$/.test(val))
      if (!itContainsBlanks) {
        return callback(new Error("Solo se admite letras y subguion '_'"))
      }
      callback()
    },
    trigger: 'blur'
  }
]

export const geometry = [
  {
    validator: (rule, value, callback) => {
      let itContainsValue = value.geometry.coordinates[0] !== 0
      if (!itContainsValue) {
        return callback(new Error('La geometría es requerída'))
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
  message: 'El primer apellido es requerido'
}]
export const lastNameAditional = [{
  required: true,
  message: 'El segundo apellidos es requerido'
}]
export const region = [{
  required: true,
  message: 'La región es requerida'
}]
export const institute = [{
  required: true,
  message: 'La institución es requerida'
}]
export const subject = [
  {
    required: true,
    message: 'Detalle el motivo para acceder al Geoportal UNAT'
  },
  {
    min: 10,
    message: 'Indique al menos 10 caracteres'
  },
]
export const observation = [{
  required: true,
  message: 'Este campo es requerido'
}]
