<template>
  <div>
    <div class="row">
      <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
        <UploadImage/>
        <form action>
          <div class="form-group">
            <label class="font-weight-bold">Nombre de Usuario</label>
            <input type="text" class="form-control">
          </div>
          <div class="form-group">
            <label class="font-weight-bold">Correo</label>
            <input type="email" class="form-control">
          </div>
          <div class="row">
            <div class="col-xs-24 col-sm-24 col-md-12 col-lg-12">
              <div class="form-group">
                <label class="font-weight-bold">contraseña</label>
                <input type="password" class="form-control">
              </div>
            </div>
            <div class="col-xs-24 col-sm-24 col-md-12 col-lg-12">
              <div class="form-group">
                <label class="font-weight-bold">Repita contraseña</label>
                <input type="password" class="form-control">
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
        <form class="py-4">
          <div>
            <div class="row">
              <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                  <label class="font-weight-bold">Nombre</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                  <label class="font-weight-bold">Apellidos</label>
                  <input type="text" class="form-control">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-24 col-sm-12 col-md-8 col-lg-8">
                <div class="form-group">
                  <label class="font-weight-bold">Región</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-xs-24 col-sm-12 col-md-8 col-lg-8">
                <div class="form-group">
                  <label class="font-weight-bold">Provincia</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-xs-24 col-sm-24 col-md-8 col-lg-8">
                <div class="form-group">
                  <label class="font-weight-bold">Distrito</label>
                  <input type="text" class="form-control">
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="form-group">
              <label class="font-weight-bold">Intitución</label>
              <input type="password" class="form-control">
            </div>
            <div class="form-group">
              <label class="font-weight-bold">¿Cual es tu motivo para usar el GeoPortal?</label>
              <textarea rows="6" class="form-control"></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="content-center">
      <button type="button" class="btn">cancelar</button>
      <button type="button" class="btn btn-success">Registrar</button>
    </div>
  </div>
</template>
<script>
import UploadImage from "@/components/UploadImage.vue";
export default {
  components: {
    UploadImage
  }
};
</script>
<style lang="css">

</style>
