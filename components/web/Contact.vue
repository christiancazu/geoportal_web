<template>
  <section id="contact" class="py-5 text-center" style="background: #f8f9fc;">
    <div class="container">
      <div class="row">
        <div class="offset-md-3 col-md-6">
          <h6 class="text-mayus my-2 title-link">Contacto</h6>
          <h2 class="text-mayus my-3">Envianos un Mensaje</h2>
          <el-form label-position="top" ref="form" :model="form" label-width="120px">
            <el-form-item>
              <el-input placeholder="Nombre" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="Email" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="Mensaje" type="textarea" v-model="form.message"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">Enviar</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: ""
      }
    };
  }
};
</script>

<style lang="scss">
// #contact {
//   background: url(http://demo.epic-webdesign.com/tf-epic-launch/v4/images/luna-image3.jpg)
//     top center no-repeat;
//   background-size: cover;
//   padding: 70px 0;
//   min-height: 746px;
// }
</style>
