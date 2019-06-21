<template>
  <div class="row ma-0">
    <div class="col-xs-24 col-sm-8 col-md-6 col-lg-6 col-center">

      <!-- <div> -->

      <!-- Nav tabs -->
      <div class="panel panel-default">
        <div class="panel-heading pb-0">
          <ul
            class="nav nav-tabs nav-justified"
            role="tablist"
          >
            <li
              role="presentation"
              class="active"
            ><a
                href="#home"
                aria-controls="home"
                role="tab"
                data-toggle="tab"
                class="font-weight-bold"
              >Iniciar Sesión</a></li>
            <li role="presentation"><a
                href="#profile"
                aria-controls="profile"
                role="tab"
                data-toggle="tab"
                class="font-weight-bold"
              >Registrarse</a></li>
          </ul>
        </div>

        <!-- Tab panes -->
        <div class="panel-body">
          <div class="tab-content">
            <div
              role="tabpanel"
              class="tab-pane fade in active"
              id="home"
            >
              <form
                action=""
                class="py-4"
              >
                <div class="form-group">
                  <label class="font-weight-bold">Usuario</label>
                  <input
                    type="text"
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label class="font-weight-bold">contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                  >
                </div>
              </form>
              <div class="content-center">
                <button
                  type="button"
                  class="btn"
                >
                  cancelar
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                >
                  Ingresar
                </button>
              </div>
              <p class="text-center">
                <a href="">
                  Olvidaste tu contraseña
                </a>
              </p>
            </div>
            <div
              role="tabpanel"
              class="tab-pane fade "
              id="profile"
            >Register</div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style scoped>
.col-center {
  margin: 0 auto;
  margin-top: 2.5rem;
  float: none;
}

.pb-0 {
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  border-bottom: 0px;
}

.content-center {
  padding: 1.2rem 0px;
  display: flex;
  justify-content: center;
}

.btn {
  margin: 0px 0.2rem;
}
</style>
