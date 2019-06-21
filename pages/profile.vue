<template>
  <div class="row">
    <div class="col-xs-24 col-sm-12 col-md-12 col-lg-14 col-center">
      <form
        action=""
        method="post"
      >
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Perfil de Usuario</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-24 col-sm-8 col-md-8 col-lg-8">
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt=""
                  class="img-circle"
                >
                <div class="form-group">
                  <label>Nombre de Usuario:</label>
                  <input
                    type="text"
                    class="form-control"
                  >
                </div>

              </div>
              <div class="col-xs-24 col-sm-16 col-md-16 col-lg-16">
                <div class="row">
                  <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                      <label>Nombre:</label>
                      <input
                        type="text"
                        class="form-control"
                      >
                    </div>
                  </div>
                  <div class="col-xs-24 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                      <label>Apellido:</label>
                      <input
                        type="text"
                        class="form-control"
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-24 col-sm-8 col-md-8 col-lg-8">
                    <div class="form-group">
                      <label>Región:</label>
                      <input
                        type="text"
                        class="form-control"
                      >
                    </div>
                  </div>
                  <div class="col-xs-24 col-sm-8 col-md-8 col-lg-8">
                    <div class="form-group">
                      <label>Provincia:</label>
                      <input
                        type="text"
                        class="form-control"
                      >
                    </div>
                  </div>
                  <div class="col-xs-24 col-sm-8 col-md-8 col-lg-8">
                    <div class="form-group">
                      <label>Distrito:</label>
                      <input
                        type="text"
                        class="form-control"
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Intitución:</label>
                  <input
                    type="text"
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label>Motivo de uso del Geoportal:</label>
                  <textarea
                    class="form-control"
                    rows="5"
                  ></textarea>
                </div>

              </div>
            </div>

          </div>
          <div class="panel-footer text-right">
            <button
              type="button"
              class="btn btn-default"
            >Cancelar</button>
            <button
              type="button"
              class="btn btn-success"
            ><i class="fa fa-save"></i>
              Guardar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 1
    };
  },

  methods: {
    next () {
      if (this.active++ > 2) this.active = 0;
    }
  }
}
</script>