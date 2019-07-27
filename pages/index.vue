<template lang="pug">
section#body
  section
    .container
      .row
        .col-sm-4
          .alert.alert-warning Manual de usuario
          .alert.alert-warning Manual de usuario
  section#info
    .container
      .row 
        .col-sm-12
            h1.section-title ¿A qué nos dedicamos?
            .section-content
  section#contact
    .container
      .row 
        .col-sm-12
            h1.section-title Contáctenos
            .section-content
              center
                form#contact-form
                  .form-group
                    label Nombres:
                    input(type='text').form-control.form-control-sm
                  .form-group
                    label Apellidos:
                    input(type='text').form-control.form-control-sm
                  .form-group
                    label Correo electrónico:
                    input(type='email').form-control.form-control-sm
                  .form-group
                    label Mensaje:
                    textarea.form-control.form-control-sm
  footer
    .container
      .row
        .col-12.col-sm-4
          h1 Nosotros
          p Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos.
        .col-12.col-sm-4
          h1 Enlaces importantes
        .col-12.col-sm-4
          h1 Información de contacto
</template>

<script>
export default {};
</script>


<style scoped>
#body {
  font-size: 12px;
  font-family: "Montserrat", sans-serif;
}

footer {
  padding: 50px 0;
  background-color: #333;
}

footer h1 {
  margin: 0;
  padding: 10px 0;
  font-size: 16px;
  font-weight: bolder;
  color: #f5f5f5;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  padding: 10px 0;
  font-size: 24px;
  font-weight: bolder;
  text-align: center;
  text-transform: uppercase;
}

.section-content {
  padding: 10px 0;
}

#contact {
  padding: 50px 0;
  min-height: 450px;
  background-color: #f5f5f5;
}

#info {
  padding: 50px 0;
  min-height: 450px;
  background-color: #64001D;
}


#contact-form {
  width: 30%;
}

#contact-form label {
  margin: 0;
  font-weight: normal;
  text-transform: uppercase;
}

#contact-form .form-group {
  margin: 5px;
}

#contact-form .form-control {
  border-radius: 0;
}
</style>
