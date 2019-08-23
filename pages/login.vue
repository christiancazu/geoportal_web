<template>
  <el-row
    :gutter="10"
    class="content-center pt-5 ma-0"
  >
    <el-col
      :xs='24'
      :md="14"
      :sm="16"
      :lg="10"
    >
      <el-row
        :gutter="2"
        class="el-card is-always-shadow"
      >
        <el-col
          :xs="24"
          :md="12"
          :sm="12"
          :lg="12"
          class="text-xs-center br"
        >
          <el-card
            shadow="never"
            class="border-none"
          >
            <div
              slot="header"
              class="clearfix"
            >
              <p class="ma-0 font-weight-bold">PORTAL DE ADMINISTRADORES</p>
            </div>
            <p class="font-weight-bold"></p>
            <el-image
              style="width: 150px; height: 150px"
              src="image/logo_escudo.png"
              fit="contain"
            ></el-image>
            <p>¿Aún no tienes cuenta? <el-link
                type="primary"
                class="font-weight-bold"
              >Regístrese</el-link>
            </p>
            <small>
              <el-link type="primary">Ir pagina principal</el-link>
            </small>

          </el-card>
        </el-col>
        <el-col
          :xs="24"
          :md="12"
          :sm="12"
          :lg="12"
          class="bt"
        >
          <el-card
            shadow="never"
            class="border-none"
          >
            <div
              class="text-xs-center p"
              slot="header"
            >
              <label>INICIAR SESIÓN</label>
            </div>
            <el-form
              ref="formLogin"
              label-position="top"
              status-icon
              :model="form"
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
              @submit.native.prevent="submitForm"
            >
              <el-form-item
                prop="email"
                label="Nombre de Usuario"
                :rules="rules.email"
              >
                <el-input
                  :disabled="processingForm"
                  v-model="form.email"
                  type="text"
                />
              </el-form-item>
              <el-form-item
                label="Contraseña"
                prop="password"
              >
                <el-input
                  :disabled="processingForm"
                  v-model="form.password"
                  type="password"
                  autocomplete="off"
                  :rules="rules.password"
                />
              </el-form-item>
              <p class="text-xs-right">
                <el-link type="primary">Olvidaste tu contraseña</el-link>
              </p>
              <el-form-item class="text-xs-center mb-0">
                <el-button
                  :loading="processingForm"
                  type="primary"
                  size="small"
                  native-type="submit"
                  @click.prevent="submitForm"
                  class="btn-block"
                >
                  INGRESAR
                </el-button>
              </el-form-item>

            </el-form>
            <div
              class="text-xs-center"
              slot="footer"
            >
              <label>INICIAR SESIÓN</label>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { Promise } from 'q';
export default {

  head: {
    title: 'Iniciar Sesión',
  },

  data () {
    return {
      processingForm: false,

      form: {
        email: null,
        password: null
      },

      rules: {
        email: [{
          required: true,
          message: 'Ingrese su nombre de usuario'
        }],
        password: [{
          required: true,
          message: "Ingrese su contraseña"
        }]
      }
    }
  },

  created () {
  },

  methods: {
    submitForm () {
      this.$refs.formLogin.validate((valid) => {
        if (valid) {
          this.login()
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
        this.$router.push('/geovisor')
      } catch (error) {
        // this.$toast.error('Erlocalror al ingresar')
        if (!error.response) return
        this.error = error.response.data || null
      } finally {
        this.processingForm = false
      }
    },
  }

}
</script>
