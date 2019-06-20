<template>
  <div class="row">
    <div class="col-xs-24 col-sm-8 col-md-6 col-lg-6 col-center">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title font-weight-bold">Iniciar Sesión</h3>
        </div>
        <div class="panel-body">

          <form action="">
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
            Ingresar</button>
        </div>
        <!-- <div class="layout-default">
    <section class="hero is-fullheight is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <article class="card is-rounded">
              <div class="card-content">
                <h1 class="title">

                  <img
                    src="https://placeholdit.imgix.net/~text?txtsize=13&txt=150%C3%9750&w=150&h=50"
                    alt="logo"
                    width="200"
                  >
                </h1>
                <p class="control has-icon">
                  <input
                    class="input"
                    type="email"
                    placeholder="Email"
                  >
                  <i class="fa fa-envelope"></i>
                </p>
                <p class="control has-icon">
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                  >
                  <i class="fa fa-lock"></i>
                </p>
                <p class="control">
                  <label class="checkbox">
                    <input type="checkbox">
                    Remember me
                  </label>
                </p>
                <p class="control">
                  <button class="button is-primary is-medium is-fullwidth">
                    <i class="fa fa-user"></i>
                    Login
                  </button>
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div> -->
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
</style>
