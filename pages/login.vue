<template>
  <div>
    <el-container style="justify-content: center">
      <el-card
        shadow="always"
        :body-style="{ padding:'0px' }"
      >
        <el-card
          shadow="never"
          class="border-none"
        >
          <div slot="header">
            <label>Iniciar Sesión</label>
          </div>
          <div>
            <el-form
              ref="formLogin"
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
                prop="password"
              >
                <el-input
                  v-model="form.password"
                  type="password"
                  autocomplete="off"
                  :rules="rules2.password"
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
      processingForm: true,

      form: {
        email: null,
        password: null
      },

      rules2: {
        password: [
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

  created () {
    // console.log(this.$route)
  },

  methods: {
    submitForm () {
      this.$refs.formLogin.validate((valid) => {
        if (valid) {

          console.log('submit!')
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    async login () {
      this.processingForm = true

      try {
        this.$toast.info('Ingresando ...')

        await this.$auth.loginWith('local', {
          data: {
            username: this.form.email,
            password: this.form.password
          }
        })

        this.$toast.success(`Bienvenido ${this.user.name}`)
        this.$router.push('/')
        this.showDrawerIfNeeded({ currentBreakpoint: this.$vuetify.breakpoint.name })
      } catch (error) {
        this.$toast.error('Error al ingresar')
        if (!error.response) return
        this.error = error.response.data || null
      } finally {
        this.processingForm = false
      }
    }
  }

}
</script>
