<template>
  <div class="row">
    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
      <img src="img/unat.jpg" alt="logo" class="img-responsive">
    </div>
    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
      <form action class="py-4">
        <div class="form-group">
          <label class="font-weight-bold">Usuario</label>
          <input type="text" class="form-control">
        </div>
        <div class="form-group">
          <label class="font-weight-bold">contraseña</label>
          <input type="password" class="form-control">
        </div>

        <div class="form-group mt-3">
          <p class="text-right">
            <a href>Olvidaste tu contraseña</a>
          </p>
        </div>
        <div class="content-center">
          <button type="button" class="btn">cancelar</button>
          <button type="button" class="btn btn-success">Ingresar</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="css">
.content-center {
  padding: 1.2rem 0px;
  display: flex;
  justify-content: center;
}
.btn {
  margin: 0px 0.2rem;
}
</style>
