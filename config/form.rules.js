export const email = [
  {
    required: true,
    message: "Ingrese su nombre de usuario"
  }
];

export const password = [
  {
    required: true,
    message: "Ingrese su contraseña"
  }
];

export const title = [
  {
    required: true,
    message: "El nombre de usuario es requerido"
  }
];

export const groupLayerId = [
  {
    required: true,
    message: "Seleccione un Grupo de capa"
  }
];

export const order = [
  {
    required: true,
    type: "number",
    message: " "
  }
];

export const url = [
  {
    required: true,
    message: "La url del mapa base es requrido"
  }
];

export const name = [
  {
    required: true,
    // pattern: /^[z0-9\s.,\/#!$%\^&\*;:{}=\-+'´`~()”“"…]+$/g,
    validator: (rule, value, callback) => {
      let text = value.split("");
      let itContainsBlanks = text.every(val => /[a-zA-Z0-9_]/g.test(val));
      if (!itContainsBlanks) {
        return callback(new Error("Solo se admite letras y subguion '_'"));
      }
      callback();
    }
  }
];
