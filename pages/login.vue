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
            <!-- <p>¿Aún no tienes cuenta? <el-link
                type="primary"
                class="font-weight-bold"
              >Regístrese</el-link>
            </p> -->
            <p>
              <small>
                <el-link type="primary">Ir pagina principal</el-link>
              </small>
            </p>
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
              ref="form"
              label-position="top"
              :model="form"
              :rules="rules"
              label-width="120px"
              autocomplete="on"
              class="demo-ruleForm"
              hide-required-asterisk
              :validate-on-rule-change="false"
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
                  name="username"
                  clearable
                  autocomplete="on"
                />
              </el-form-item>
              <el-form-item
                label="Contraseña"
                prop="password"
                :rules="rules.password"
              >
                <el-input
                  :disabled="processingForm"
                  v-model="form.password"
                  type="password"
                  clearable
                  name="password"
                  autocomplete="on"
                />
              </el-form-item>
              <!-- <p class="text-xs-right">
                <el-link type="primary">Olvidaste tu contraseña</el-link>
              </p> -->
              <el-form-item class="text-xs-center mb-0">
                <el-button
                  :loading="$store.state.spinners.processingForm"
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
import { email, password } from '@/config/form.rules'

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
        email,
        password
      }
    }
  },

  methods: {
    async submitForm () {
      this.processingForm = true
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        try {
          await this.$auth.loginWith('local', {
            data: {
              username: this.form.email,
              password: this.form.password
            }
          })
          this.$toast.success(this.$SUCCESS.WELLCOME)
          
        } catch (e) {}
      }
      this.processingForm = false
    }
  }
}
</script>
