<template>
  <BaseModal
    title="Modificar datos de usuario"
    :show-modal="showModalEditUser"
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
        :disabled="processingForm"
        @submit.prevent="submitForm"
        v-if="user"
      >
        <el-row
          :gutter="10"
          align="bottom"
          justify="center"
        >
          <el-col :md="12">
            <!-- image -->
            <el-form-item
              label="Imagen de Perfil"
              class="text-xs-center"
              prop="image"
            >
              <el-upload
                class="avatar-uploader"
                action
                :http-request="launchUploadAvatar"
                :show-file-list="false"
                name="image"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="imageSelected"
                  :src="imageSelected"
                  class="avatar"
                />
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <!-- username -->
            <el-form-item
              label="Nombre de Usuario"
              prop="username"
            >
              <el-input
                v-model="user.username"
                type="text"
                disabled
                autocomplete="off"
              />
            </el-form-item>

            <!-- email -->
            <el-form-item
              label="Correo Electrónico"
              prop="email"
            >
              <el-input
                disabled
                v-model="user.email"
                type="text"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
            <!-- regionId -->
            <el-form-item
              label="Región"
              prop="regionId"
            >
              <el-select
                v-model="user.regionId"
                value-key="id"
                filterable
                disabled
                :loading="loadingRegions"
                placeholder="Select"
              >
                <el-option
                  v-for="item in regions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="8"
          >
            <!-- porvincia -->
            <el-form-item
              label="Provincia"
              prop="provinceId"
              ref="provinceId"
            >
              <el-select
                v-model="user.provinceId"
                value-key="id"
                :loading="loadingProvinces"
                filterable
                placeholder="Select"
                disabled
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="8"
          >
            <!-- distrito -->
            <el-form-item
              label="Distrito"
              prop="districtId"
              ref="districtId"
            >
              <el-select
                v-model="form.districtId"
                value-key="id"
                filterable
                :disabled="processingForm"
                :loading="loadingDistricts"
                placeholder="Select"
              >
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
        <el-row :gutter="10">
          <el-col
            :xs="12"
            :sm="12"
            :md="12"
          >
            <!-- instituto -->
            <el-form-item
              label="Institución"
              prop="institute"
            >
              <el-input
                v-model="form.institute"
                type="text"
                disabled
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="12"
            :sm="12"
            :md="12"
          >
            <el-form-item
              class="text-xs-center"
              label="Privilegio"
            >
              <el-switch
                class="text-xs-center"
                style="display: block"
                v-model="form.userTypeId"
                inactive-color="#6376f7"
                active-color="#6376f7"
                inactive-text="Administrador"
                active-text="Usuario"
                inactive-value="AD"
                active-value="US"
              >
              </el-switch>
            </el-form-item>
            <el-form-item
              class="text-xs-center"
              label="Cuenta"
            >
              <el-switch
                class="text-xs-center"
                style="display: block"
                v-model="form.status"
                inactive-color="#6376f7"
                active-color="#6376f7"
                inactive-text="Activa"
                active-text="Inactiva"
                inactive-value="AC"
                active-value="IN"
              >
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- objetivo -->
        <el-form-item
          label="¿Porque desea usar el Geoportal?"
          prop="subject"
        >
          <el-input
            v-model="form.subject"
            type="textarea"
            :rows="3"
            disabled
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        :disabled="processingForm"
        @click="replaceShowModalEditUser({ show: false })"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        native-type="submit"
        :loading="processingForm"
        @click.prevent="submitForm"
      >GUARDAR</el-button>
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
  data () {
    return {
      imageSelected: "",
      processingForm: false,
      form: {
        userTypeId: '',
        districtId: '',
        name: '',
        lastName: '',
        lastNameAditional: '',
        uploadImage: '',
        status:'AC'
      },

      rules: {
        name: [{
          required: true,
          message: "El nombre es requerido"
        }],
        lastName: [{
          required: true,
          message: "El nombre es requerido"
        }]
      }
    };
  },

  watch: {
    showModalEditUser: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields()
        this.imageSelected = ""
        return false
      }
      this.getRegions()
      this.setFormField()
    }
  },

  computed: {
    ...mapState({
      user: state => state.users.user,
      regions: state => state.regions.regions,
      loadingRegions: state => state.regions.loadingRegions,
      provinces: state => state.regions.provinces,
      loadingProvinces: state => state.regions.loadingProvinces,
      districts: state => state.regions.districts,
      loadingDistricts: state => state.regions.loadingDistricts
    }),

    showModalEditUser: {
      get () {
        return this.$store.state.modalsManagementUser.showModalEditUser;
      },
      set (value) {
        this.replaceShowModalEditUser({ show: value });
      }
    }
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

    setFormField () {
      this.form.userTypeId = this.user.userTypeId
      this.form.districtId = this.user.districtId
      this.form.name = this.user.name
      this.form.lastName = this.user.lastName
      this.form.lastNameAditional = this.user.lastNameAditional
      this.form.uploadImage = this.user.image
      this.imageSelected = this.user.image
      this.form.status = this.user.status

      this.getProvinces({ params: { id: this.user.regionId } });
      this.getDistricts({ params: { id: this.user.provinceId } });
    },

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true
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

    updateUser () {
      const data = new FormData()
      let keys = Object.keys(this.form);
      keys.forEach(val => {
        data.append(val, this.form[val]);
      });

      return new Promise((resolve, reject) => {
        this.$userAPI
          .update({ data })
          .then(response => {
            this.processingForm = false
            this.$toast.success(`El usuario ha sido actualizado con éxito`)

            resolve(response);
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          });
      });
    },

    launchUploadAvatar (option) {
      this.imageSelected = URL.createObjectURL(option.file);
      this.form.uploadImage = option.file;
    },

    beforeAvatarUpload (file) {
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
  }
};
</script>
