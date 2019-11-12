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

export const name = name => [
  {
    required: true,
    message: `El nombre de ${name} es requerido`
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
