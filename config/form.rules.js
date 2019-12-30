import { URL_MAP_REG_EX } from '@/config/constants'

export const email = [
  {
    required: true,
    message: 'La dirección de correo electrónico es requerida'
  },
  {
    min: 6,
    message: 'Indique al menos 6 caracteres',
    trigger: 'blur'
  },
  {
    max: 30,
    message: 'Indique menos de 30 caracteres',
    trigger: 'blur'
  },
  {
    // eslint-disable-next-line no-unused-vars
    validator: (rule, value, callback) => {
      // eslint-disable-next-line no-useless-escape
      const emailRegEx = /^[(a-z0-9\_\-\.)]+@[(a-z0-9\_\-\.)]+\.[(a-z)]{2,30}$/
      if (!emailRegEx.test(value)) {
        return callback(new Error('Debe indicar un email válido'))
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
    message: 'Seleccione un grupo de capas'
  }
]

export const order = [
  {
    required: true,
    type: 'number',
    message: 'Debe indicar un valor numérico'
  }
]

export const categoryGroupId = [
  {
    required: true,
    type: 'number',
    message: 'Debe indicar un grupo de capas'
  }
]

export const url = url => [
  {
    required: true,
    message: `La url del ${url} es requerido`
  },
  {
    // eslint-disable-next-line no-unused-vars
    validator: (rule, value, callback) => {
      if (!URL_MAP_REG_EX.test(value)) {
        return callback(new Error("la URL del mapa base no es válida"))
      }
      callback()
    },
    trigger: 'blur'
  }
]

export const isUrlValid = [
  {
    // eslint-disable-next-line no-unused-vars
    validator: (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Debe confirmar que la URL es válida"))
      }
      callback()
    }
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

export const file = [
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
    // eslint-disable-next-line no-unused-vars
    validator: (rule, value, callback) => {
      let text = value.split('')
      let itContainsBlanks = text.every(val => /^\w*$/.test(val))
      if (!itContainsBlanks) {
        return callback(new Error("Solo se admite letras, números y subguión '_'"))
      }
      callback()
    },
    trigger: 'blur'
  }
]

export const geometry = [
  {
    // eslint-disable-next-line no-unused-vars
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
export const nameUser = name => [
  {
    required: true,
    message: `El ${name} es requerido`
  },
  {
    min: 3,
    message: 'Indique al menos 3 caracteres',
    trigger: 'blur'
  },
  {
    max: 50,
    message: 'Indique menos de 50 caracteres',
    trigger: 'blur'
  },
  {
    // eslint-disable-next-line no-unused-vars
    validator: (rule, value, callback) => {
      // eslint-disable-next-line no-useless-escape
      const usernameRegEx = /^[a-zA-ZéáíóúÁÉÍÓÚñÑ\s]{3,50}$/
      if (!usernameRegEx.test(value)) {
        return callback(new Error('No se permiten números ni caracteres especiales'))
      }
      callback()
    },
    trigger: 'blur'
  }
]

export const lastName = [
  {
    required: true,
    message: 'El primer apellido es requerido'
  }
]

export const lastNameAditional = [
  {
    required: true,
    message: 'El segundo apellidos es requerido'
  }
]

export const provinceId = [
  {
    required: true,
    message: 'La provincia es requerida'
  }
]

export const regionId = [
  {
    required: true,
    message: 'La región es requerida'
  }
]

export const institute = [
  {
    required: true,
    message: 'La institución es requerida'
  }
]

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

export const observation = [
  {
    required: true,
    message: 'La observación es requerida'
  }
]
