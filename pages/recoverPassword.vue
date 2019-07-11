<template>
  <el-container direction="vertical">
    <el-row class="content-center">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card shadow="always">
          <div slot="header">
            <label>Recuperar Contraseña</label>
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
                label="Correo Electrónico"
                :rules="rules2.email"
              >
                <el-input
                  v-model="form.email"
                  type="email"
                />
              </el-form-item>
              <el-form-item class="text-xs-center pt-3 mb-0">
                <el-button
                  type="primary"
                  @click="submitForm"
                >
                  Recuperar Contraseña
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {

  data () {
    return {

      form: {
        email: null,
      },

      rules2: {
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
