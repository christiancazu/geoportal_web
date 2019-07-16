<template>
  <div>
    <el-container style="justify-content: center">
      <el-card shadow="always">
        <div slot="header">
          <label>Registro</label>
        </div>
        <el-form
          ref="form"
          label-position="top"
          status-icon
          :model="form"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          @submit.prevent="submitForm"
        >
          <el-row :gutter="10">
            <el-col
              :xs="24"
              :sm="10"
            >
              <!-- image -->
              <el-form-item
                label="Imagen de Perfil"
                class="text-xs-center"
              >
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  name="image"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    class="avatar"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
                <!-- username -->
              </el-form-item>
              <el-form-item
                label="Nombre de Usuario"
                prop="username"
              >
                <el-input
                  v-model="form.username"
                  type="text"
                  autocomplete="off"
                />
              </el-form-item>
              <!-- password_1 -->
              <el-form-item
                label="contraseña"
                prop="password"
              >
                <el-input
                  v-model="form.password"
                  type="password"
                  autocomplete="off"
                  :rules="rules.password"
                />
              </el-form-item>
              <!-- password_2 -->
              <el-form-item
                label="Repita Contraseña"
                prop="passwordConfirmation"
              >
                <el-input
                  v-model="form.passwordConfirmation"
                  type="password"
                  autocomplete="off"
                  :rules="rules.passwordConfirmation"
                />
              </el-form-item>
            </el-col>
            <el-col
              :xs="24"
              :sm="14"
            >
              <!-- email -->
              <el-form-item
                label="Correo Electrónico"
                prop="email"
              >
                <el-input
                  v-model="form.email"
                  type="text"
                  autocomplete="off"
                />
              </el-form-item>
              <el-row :gutter="10">
                <el-col
                  :xs="24"
                  :sm="8"
                >
                  <!-- name -->
                  <el-form-item
                    label="Nombres"
                    prop="name"
                  >
                    <el-input
                      v-model="form.name"
                      type="text"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="8"
                >
                  <!-- lasname -->
                  <el-form-item
                    label="Apellido"
                    prop="lastName"
                  >
                    <el-input
                      v-model="form.lastName"
                      type="text"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="8"
                >
                  <!-- lasname -->
                  <el-form-item
                    label="Segundo apellido"
                    prop="lastNameAditional"
                  >
                    <el-input
                      v-model="form.lastNameAditional"
                      type="text"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col
                  :xs="24"
                  :sm="8"
                >
                  <!-- region -->
                  <el-form-item
                    label="Región"
                    prop="region"
                  >
                    <el-input
                      v-model="form.regionId"
                      type="text"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="8"
                >
                  <!-- porvincia -->
                  <el-form-item
                    label="Provincia"
                    prop="province"
                  >
                    <el-input
                      v-model="form.province"
                      type="text"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="8"
                >
                  <!-- distrito -->
                  <el-form-item
                    label="Distrito"
                    prop="district"
                  >
                    <el-input
                      v-model="form.district"
                      type="text"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- instituto -->
              <el-form-item
                label="Institución"
                prop="institute"
              >
                <el-input
                  v-model="form.institute"
                  type="text"
                  autocomplete="off"
                />
              </el-form-item>
              <!-- objetivo -->
              <el-form-item
                label="Objetivo"
                prop="subject"
              >
                <el-input
                  v-model="form.subject"
                  type="textarea"
                  :rows="3"
                  autocomplete="off"
                  :maxlength="300"
                  :show-word-limit="true"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="text-xs-center mb-0">
            <el-button
              type="primary"
              @click="submitForm"
            >Registrarse</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      imageUrl: "",
      form: {
        username: '',
        email: '',
        image: '',
        subject: null,
        name: '',
        lastName: '',
        lastNameAditional: '',
        institute: '',
        password: '',
        passwordConfirmation: ''
      },

      rules: {
        username: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        name: [{
          required: true,
          message: "El nombre es requerido"
        }],
        lastName: [{
          required: true,
          message: "El nombre es requerido"
        }],
        password: [{
          required: true,
          min: 6,
          message: "La contraseña es requerida"
        }],
        passwordConfirmation: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value !== this.form.password) {
              return callback(new Error('La contraseña no coincide'))
            }
            callback()
          }
        }],
        email: [{
          required: true,
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'El correo electrónico debe ser válido'
        }],
        subject: [{
          required: true,
          min: 150,
          message: 'Detalle el motivo para acceder al Geoportal UNAT'
        }],
        institute: [{
          required: true,
          message: 'La institución es requerida'
        }]
      }
    };
  },

  methods: {
    submitForm (e) {
      e.preventDefault();
      this.$refs.form.validate(valid => {
        if (valid) {
          this.register()
        }
      });
    },

    register () {
      const data = this.form
      return new Promise((resolve, reject) => {
        this.$userAPI.create({ data })
          .then(response => {
            resolve(response)
          }).catch(error => reject(error))
      })
    },

    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("La imagen debe estar en formato JPG!");
      }
      if (!isLt2M) {
        this.$message.error("La imagen excede los 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
