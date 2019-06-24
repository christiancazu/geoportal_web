<template>
  <div class="row ma-0">
    <div class="col-xs-24 col-sm-14 col-md-14 col-lg-14 col-center">
      <!-- <div> -->

      <!-- Nav tabs -->
      <div class="panel panel-default">
        <div class="panel-heading pb-0">
          <ul class="nav nav-tabs nav-justified" role="tablist">
            <li role="presentation" class="active">
              <a
                href="#home"
                aria-controls="home"
                role="tab"
                data-toggle="tab"
                class="font-weight-bold"
              >Iniciar Sesión</a>
            </li>
            <li role="presentation">
              <a
                href="#profile"
                aria-controls="profile"
                role="tab"
                data-toggle="tab"
                class="font-weight-bold"
              >Registrarse</a>
            </li>
          </ul>
        </div>

        <!-- Tab panes -->
        <div class="panel-body" style="min-height:240px;">
          <div class="tab-content" style="min-height: 240px">
            <div role="tabpanel" class="tab-pane fade in active" id="home">
              <!-- login -->
              <Login/>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="profile">
              <FormRegister/>

              <!-- <div class="btn-back-next text-center">
                <button type="button" class="btn" @click="back">Regresar</button>
                <button type="button" class="btn btn-success" @click="next">Siguiente</button>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "@/components/FormLogin.vue";
import FormRegister from "@/components/FormRegister.vue";
export default {
  components: {
    Login,
    FormRegister
  },

  data() {
    return {
      active: 1
    };
  },

  computed: {
    tab: function() {
      const test = document.getElementsByClassName("active");
      console.log(test);
      return test;
    }
  },

  methods: {
    next() {
      this.active++;
    },

    back() {
      this.active--;
    }
  }
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
</style>
