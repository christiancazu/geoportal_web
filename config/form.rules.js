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
    message: 'El título es requerido'
  }
]
export const geometry = [
  {
    required: true,
    message: 'La geometría es requerida'
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
    message: ' '
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
    message: 'El Archivo es requerido'
  }
]

export const rasterFile = [
  {
    required: true,
    message: 'El Archivo es requerido'
  }
]

export const image = [
  {
    required: true,
    message: 'El Archivo es requerido'
  }
]


/*eslint-disable */
export const nameAlpha = [
  {
    required: true,
    // pattern: /^[z0-9\s.,\/#!$%\^&\*;:{}=\-+'´`~()”“"…]+$/g,
    validator: (rule, value, callback) => {
      let text = value.split('')
      let itContainsBlanks = text.every(val => /^\w*$/.test(val))
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
export const subject = [{
  required: true,
  min: 10,
  message: 'Detalle el motivo para acceder al Geoportal UNAT'
}]
export const observation = [{
  required: true,
  message: 'Este campo es requerido'
}]