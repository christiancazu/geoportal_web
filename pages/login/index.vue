<template>
<el-row
  :gutter="10"
  class="content-center pt-5 ma-0"
>
  <el-col
    :xs="24" :md="14" :sm="16" :lg="10"
  >
    <el-row
      :gutter="2"
      class="el-card is-always-shadow"
    >
      <el-col
        :xs="24" :md="12" :sm="12" :lg="12"
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
            <p class="ma-0 font-weight-bold">
              PORTAL DE ADMINISTRADORES
            </p>
          </div>
          <p class="font-weight-bold" />
          <el-image
            style="width: 150px; height: 150px"
            src="image/logo_escudo.png"
            fit="contain"
          />
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
        :xs="24" :md="12" :sm="12" :lg="12"
        class="bt"
      >
        <el-card
          shadow="never"
          class="border-none"
        >
          <div
            slot="header"
            class="text-xs-center p"
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
                v-model="form.email"
                :disabled="$store.state.spinners.processingForm"
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
                v-model="form.password"
                :disabled="$store.state.spinners.processingForm"
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
                class="btn-block"
                @click.prevent="submitForm"
              >
                INGRESAR
              </el-button>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="text-xs-center"
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
import { password } from '@/config/form.rules'

import {
  ENABLE_PROCESSING_FORM,
  DISABLE_PROCESSING_FORM
} from '@/types/mutation-types'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: 'El usuario es requerido'
          }
        ],
        password
      }
    }
  },

  methods: {
    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => (isFormValid = result))

      if (isFormValid) {
        this.$store.commit(`spinners/${ENABLE_PROCESSING_FORM}`)
        try {
          await this.$auth.loginWith('local', {
            data: {
              username: this.form.email,
              password: this.form.password
            }
          })
          this.$toast.success(this.$SUCCESS.WELLCOME)
        }
        catch (e) {}
      }
      this.$store.commit(`spinners/${DISABLE_PROCESSING_FORM}`)
    }
  },

  head: {
    title: 'Iniciar Sesión'
  }
}
</script>
