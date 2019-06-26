<template>
  <div>
    <el-container style="justify-content: center">
      <el-card
        shadow="always"
        :body-style="{ padding:'0px' }"
      >
        <el-card shadow="never" class="border-none" >
          <div slot="header">
            <label>Iniciar Sesión</label>
          </div>
          <div>
            <el-form
              ref="form"
              label-position="top"
              status-icon
              :model="form"
              :rules="rules2"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item
                prop="email"
                label="Nombre de Usuario"
                :rules="rules2.email"
              >
                <el-input
                  v-model="form.email"
                  type="email"
                />
              </el-form-item>
              <el-form-item
                label="Contraseña"
                prop="pass"
              >
                <el-input
                  v-model="form.pass"
                  type="password"
                  autocomplete="off"
                  :rules="rules2.pass"
                />
              </el-form-item>
              <el-form-item class="text-xs-center mb-0">
                <el-button
                  type="primary"
                  @click="submitForm"
                >
                  Ingresar
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-divider style="margin: 0px;" />
        <div class="label-text pa-3">¿No tienes cuenta?
          <nuxt-link to="/register">Registrate</nuxt-link>
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {

  data () {
    return {

      form: {
        email: null,
        pass: null
      },

      rules2: {
        pass: [
          { required: true },
          { min: 6, message: 'The password can not be less than 6 digits', trigger: 'change' }
        ],
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ]

      }
    }
  },

  created(){
    console.log(this.$route)
  },

  methods: {
    submitForm (e) {
      e.preventDefault()
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

}
</script>
