<template>
  <div
    class="theme-purple-pink p-4"
    style="height: 100%"
  >
    <el-container
      class="container-fluid"
      style="justify-content: center"
    >
      <el-card shadow="always">
        <div
          class="text-xs-center"
          slot="header"
        >
          <label>Iniciar Sesión</label>
        </div>
        <div>
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
            <el-form-item class="text-xs-center mb-0">
              <el-button
                :loading="processingForm"
                type="primary"
                native-type="submit"
                @click.prevent="submitForm"
              >
                Ingresar
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import { Promise } from 'q';
export default {

  data () {
    return {
      processingForm: true,

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
