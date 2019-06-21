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
        <div
          class="panel-body"
          style="min-height:240px;"
        >
          <div
            class="tab-content"
            style="min-height: 240px"
          >
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
              </form>

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
            >
              <form class="py-4">
                <div v-if="active === 1">
                  <img
                    src="https://bulma.io/images/placeholders/128x128.png"
                    alt=""
                    height="100"
                    class="img-circle"
                  >
                  <div class="form-group">
                    <label class="font-weight-bold">Nombre de Usuario</label>
                    <input
                      type="text"
                      class="form-control"
                    >
                  </div>
                  <div class="form-group">
                    <label class="font-weight-bold">Correo</label>
                    <input
                      type="email"
                      class="form-control"
                    >
                  </div>
                </div>
                <div v-if="active === 2">
                  <div class="row">
                    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                      <div class="form-group">
                        <label class="font-weight-bold">Nombre</label>
                        <input
                          type="text"
                          class="form-control"
                        >
                      </div>

                    </div>
                    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                      <div class="form-group">
                        <label class="font-weight-bold">Apellidos</label>
                        <input
                          type="text"
                          class="form-control"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                      <div class="form-group">
                        <label class="font-weight-bold">contraseña</label>
                        <input
                          type="password"
                          class="form-control"
                        >
                      </div>
                    </div>
                    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                      <div class="form-group">
                        <label class="font-weight-bold">Repita contraseña</label>
                        <input
                          type="password"
                          class="form-control"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                      <div class="form-group">
                        <label class="font-weight-bold">Región</label>
                        <input
                          type="text"
                          class="form-control"
                        >
                      </div>
                    </div>
                    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                      <div class="form-group">
                        <label class="font-weight-bold">Provincia</label>
                        <input
                          type="text"
                          class="form-control"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="font-weight-bold">Distrito</label>
                    <input
                      type="text"
                      class="form-control"
                    >
                  </div>
                </div>
                <div v-if="active === 3">
                  <div class="form-group">
                    <label class="font-weight-bold">Intitución</label>
                    <input
                      type="password"
                      class="form-control"
                    >
                  </div>
                  <div class="form-group">
                    <label class="font-weight-bold">¿Cual es tu motivo para usar el GeoPortal?</label>
                    <textarea
                      rows="6"
                      class="form-control"
                    ></textarea>
                  </div>
                </div>
              </form>

              <div class="btn-back-next text-center">
                <button
                  type="button"
                  class="btn"
                  @click="back"
                >
                  Regresar
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="next"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      active: 1
    }
  },

  computed: {
    tab: function () {
      const test = document.getElementsByClassName('active')
      console.log(test)
      return test
    }
  },

  methods: {
    next () {
      this.active++
    },

    back () {
      this.active--
    }
  },
};
</script>

<style scoped>
.btn-back-next {
  position: absolute;
  bottom: 1.7rem;
  border: 0px;
  background: none;
  right: 1.7rem;
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
