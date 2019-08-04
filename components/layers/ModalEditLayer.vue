<template>
  <BaseModal
    title="Registrar nuevo usuario"
    :show-modal="showModalEditUser"
    :append-to-body="true"
    @action-modal="replaceShowModalEditUser"
  >
    <template v-slot:content>
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
        <el-row :gutter="10" align="bottom" justify="center">
          <el-col :md="12">
            <!-- image -->
            <el-form-item label="Imagen de Perfil" class="text-xs-center">
              <el-upload
                class="avatar-uploader"
                action
                :http-request="launchUploadAvatar"
                :show-file-list="false"
                name="image"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageSelected" :src="imageSelected" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <!-- username -->
            <el-form-item label="Nombre de Usuario" prop="username">
              <el-input v-model="form.username" type="text" autocomplete="off" />
            </el-form-item>

            <!-- email -->
            <el-form-item label="Correo Electrónico" prop="email">
              <el-input v-model="form.email" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Tipo de Usuario">
              <el-select v-model="form.userType" value-key="id" filterable placeholder="Select">
                <el-option v-for="item in []" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :md="12">
            <!-- password_1 -->
            <el-form-item label="contraseña" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                autocomplete="off"
                :rules="rules.password"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <!-- password_2 -->
            <el-form-item label="Confirmar contraseña" prop="passwordConfirmation">
              <el-input
                v-model="form.passwordConfirmation"
                type="password"
                autocomplete="off"
                :rules="rules.passwordConfirmation"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xs="24" :sm="8">
            <!-- name -->
            <el-form-item label="Nombres" prop="name">
              <el-input v-model="form.name" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <!-- lasname -->
            <el-form-item label="Apellido" prop="lastName">
              <el-input v-model="form.lastName" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <!-- lasname -->
            <el-form-item label="Segundo apellido" prop="lastNameAditional">
              <el-input v-model="form.lastNameAditional" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xs="24" :sm="8">
            <!-- region -->
            <el-form-item label="Región" prop="region">
              <el-select
                v-model="form.region"
                value-key="id"
                filterable
                placeholder="Select"
                @change="onchangeRegions"
              >
                <el-option v-for="item in regions" :key="item.id" :label="item.name" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <!-- porvincia -->
            <el-form-item label="Provincia" prop="province" ref="province">
              <el-select
                v-model="form.province"
                value-key="id"
                filterable
                placeholder="Select"
                @change="onchangeProvinces"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <!-- distrito -->
            <el-form-item label="Distrito" prop="districtId" ref="districtId">
              <el-select v-model="form.districtId" value-key="id" filterable placeholder="Select">
                <el-option
                  v-for="item in districts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- instituto -->
        <el-form-item label="Institución" prop="institute">
          <el-input v-model="form.institute" type="text" autocomplete="off" />
        </el-form-item>
        <!-- objetivo -->
        <el-form-item label="¿Porque desea usar el Geoportal?" prop="subject">
          <el-input
            v-model="form.subject"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
        <!-- <el-form-item class="text-xs-right mt-3 mb-0">
          <el-button
            type="primary"
            native-type="submits"
            @click.prevent="submitForm"
          >
            Ingresar
          </el-button>
        </el-form-item>-->
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button @click="replaceShowModalEditUser({ show: false })">Cancel</el-button>
      <el-button type="primary" native-type="submit" @click.prevent="submitForm">Confirm</el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";

export default {
  components: {
    BaseModal
  },
  data() {
    return {
      imageSelected: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        username: "",
        email: "",
        image: "",
        subject: null,
        name: "",
        lastName: "",
        lastNameAditional: "",
        institute: "",
        password: "",
        passwordConfirmation: "",
        districtId: null,
        region: null,
        province: null
      },

      rules: {
        username: [
          {
            required: true,
            message: "El nombre de usuario es requerido"
          }
        ],
        name: [
          {
            required: true,
            message: "El nombre es requerido"
          }
        ],
        lastName: [
          {
            required: true,
            message: "El nombre es requerido"
          }
        ],
        password: [
          {
            required: true,
            min: 6,
            message: "La contraseña es requerida"
          }
        ],
        passwordConfirmation: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                return callback(new Error("La contraseña no coincide"));
              }
              callback();
            }
          }
        ],
        email: [
          {
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "El correo electrónico debe ser válido"
          }
        ],
        subject: [
          {
            required: true,
            min: 10,
            message: "Detalle el motivo para acceder al Geoportal UNAT"
          }
        ],
        institute: [
          {
            required: true,
            message: "La institución es requerida"
          }
        ],
        region: [
          {
            required: true,
            message: "Seleccione su región"
          }
        ],
        province: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!this.form.region) {
                return callback(new Error("Seleccione su Provincia"));
              }
              callback();
            }
          }
        ],
        districtId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!this.form.province) {
                return callback(new Error("Seleccione su Distrito"));
              }
              callback();
            }
          }
        ]
      }
    };
  },

  watch: {
    showModalEditUser: function(newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        return false;
      }
    }
  },

  computed: {
    ...mapState({
      regions: state => state.regions.regions,
      loadingRegions: state => state.regions.loadingRegions,
      provinces: state => state.regions.provinces,
      loadingProvinces: state => state.regions.loadingProvinces,
      districts: state => state.regions.districts,
      loadingDistricts: state => state.regions.loadingDistricts
    }),

    showModalEditUser: {
      get() {
        return this.$store.state.modalsManagementUser.showModalEditUser;
      },
      set(value) {
        this.replaceShowModalEditUser({ show: value });
      }
    }
  },

  created() {
    this.getRegions();
  },

  methods: {
    ...mapActions({
      replaceShowModalEditUser: "modalsManagementUser/replaceShowModalEditUser",
      getRegions: "regions/getRegions",
      getProvinces: "regions/getProvinces",
      getDistricts: "regions/getDistricts",
      replaceProvinces: "regions/replaceProvinces",
      replaceDistricts: "regions/replaceDistricts",
      getUsers: "users/getUsers"
    }),

    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.createUser().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.form.resetFields();
              this.replaceShowModalEditUser({ show: false });
              this.getUsers();
            }
          });
        }
      });
    },

    createUser() {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        formData.append(val, this.form[val]);
      });

      const data = formData;

      return new Promise((resolve, reject) => {
        this.$userAPI
          .create({ data })
          .then(response => {
            resolve(response);
          })
          .catch(error => reject(error));
      });
    },

    launchUploadAvatar(option) {
      this.imageSelected = URL.createObjectURL(option.file);
      this.form.image = option.file;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("La imagen debe estar en formato JPG!");
      }
      if (!isLt2M) {
        this.$message.error("La imagen excede los 2MB!");
      }
      return isJPG && isLt2M;
    },

    onchangeRegions(region) {
      const params = {
        id: region.id
      };
      this.replaceProvinces({ provinces: null });
      this.replaceDistricts({ districts: null });
      this.$refs.province.resetField();
      this.$refs.districtId.resetField();

      this.getProvinces({ params });
    },

    onchangeProvinces(province) {
      const params = {
        id: province.id
      };

      this.replaceDistricts({ districts: null });
      this.$refs.districtId.resetField();
      this.getDistricts({ params });
    }
  }
};
</script>
