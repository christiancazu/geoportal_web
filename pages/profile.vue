<template>
  <div>
    <el-container style="justify-content: center">
      <el-card shadow="always">
        <div slot="header">
          <label>Mi Perfil</label>
        </div>
        <el-form
          ref="form"
          label-position="top"
          status-icon
          :model="form"
          :rules="rules2"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-row :gutter="10">
            <el-col :xs="24" :sm="10">
              <el-form-item label="Imagen de Perfil" class="text-xs-center">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="Nombre de Usuario" prop="userName">
                <el-input v-model="form.userName" type="text" autocomplete="off" />
              </el-form-item>

              <el-form-item label="contraseña" prop="pass">
                <el-input
                  v-model="form.pass"
                  type="password"
                  autocomplete="off"
                  :rules="rules2.pass"
                />
              </el-form-item>
              <el-form-item label="Repita Contraseña" prop="pass">
                <el-input
                  v-model="form.pass"
                  type="password"
                  autocomplete="off"
                  :rules="rules2.pass"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="14">
              <el-form-item label="Correo Electrónico" prop="email">
                <el-input v-model="form.email" type="text" autocomplete="off" />
              </el-form-item>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Nombres" prop="name">
                    <el-input v-model="form.name" type="text" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Apellidos" prop="lastName">
                    <el-input v-model="form.lastName" type="text" autocomplete="off" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :xs="24" :sm="8">
                  <el-form-item label="Región" prop="name">
                    <el-select
                      v-model="form.region"
                      @change="onChangeRegion"
                      filterable
                      value-key="id"
                      placeholder="Select"
                    >
                      <el-option
                        v-for="item in regiones"
                        :key="item.id"
                        :label="item.name"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8">
                  <el-form-item label="Provincia" prop="lastName">
                    <el-select
                      v-model="form.provincia"
                      value-key="id"
                      filterable
                      placeholder="Select"
                    >
                      <el-option
                        v-if="form.region"
                        v-for="item in form.region.provinces"
                        :key="item.id"
                        :label="item.name"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8">
                  <el-form-item label="Distrito" prop="lastName">
                    <el-select
                      v-model="form.distrito"
                      value-key="id"
                      filterable
                      placeholder="Select"
                    >
                      <el-option
                        v-if="form.provincia"
                        v-for="item in form.provincia.districts"
                        :key="item.id"
                        :label="item.name"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="Institución" prop="lastName">
                <el-input v-model="form.lastName" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item label="Institución" prop="lastName">
                <el-input v-model="form.lastName" type="textarea" :rows="3" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="text-xs-center mb-0">
            <el-button type="primary" @click="submitForm">Guardar Cambios</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      abc: "",
      regiones: [],

      imageUrl: "",
      form: {
        region: "",
        provincia: "",
        distrito: "",
        email: null,
        pass: null
      },

      rules2: {
        pass: [
          { required: true },
          {
            min: 6,
            message: "The password can not be less than 6 digits",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },

  computed: {
    provincias: function() {
      const regionId = this.form.region.id;
      let provincias = this.regiones.find(region => (region.id = regionId));
      return provincias || [];
    }
  },

  created() {
    this.getRegiones();
  },

  methods: {
    submitForm(e) {
      e.preventDefault();
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    async getRegiones() {
      let { data } = await this.$axios.get(
        `http://192.168.1.105:8080/geoportal/api/region/`
      );
      this.regiones = data.data;
    },

    onChangeRegion(item) {
      console.log("item", item);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
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
