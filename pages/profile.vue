<template>
  <BasePage
    title="Mi Perfil"
    :fit-content="true"
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
      >
        <el-form-item
          label="Imagen de Perfil"
          class="text-xs-center"
        >
          <el-upload
            class="avatar-uploader"
            action
            :disabled="processingForm"
            :show-file-list="false"
            name="image"
            :http-request="launchUploadAvatar"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            />
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>
        <el-row :gutter="10">
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
          >
            <el-form-item
              label="Nombre de Usuario"
              prop="username"
            >
              <el-input
                v-model="profile.username"
                type="text"
                disabled
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
          >
            <el-form-item
              label="Correo Electrónico"
              prop="email"
            >
              <el-input
                disabled
                v-model="profile.email"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
          >
            <el-form-item
              label="Nombres"
              prop="name"
            >
              <el-input
                :disabled="processingForm"
                v-model="form.name"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
          >
            <el-form-item
              label="Apellido Paterno"
              prop="lastName"
            >
              <el-input
                :disabled="processingForm"
                v-model="form.lastName"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
          >
            <el-form-item
              label="Apellido Materno"
              prop="lastNameAditional"
            >
              <el-input
                :disabled="processingForm"
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
                v-model="profile.regionId"
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
                v-model="profile.provinceId"
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
          />
        </el-form-item>
        <el-form-item class="text-xs-center mb-0">
          <el-button
            :loading="processingForm"
            type="primary"
            @click="submitForm"
          >Guardar Cambios</el-button>
        </el-form-item>
      </el-form>
    </template>
  </BasePage>
</template>
<script>
import BasePage from '@/components/base/BasePage.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    BasePage
  },

  data () {
    return {
      imageUrl: "",
      processingForm: false,
      profile: {},
      form: {
        districtId: '',
        name: '',
        lastName: '',
        lastNameAditional: '',
        status: '',
        institute: '',
        subject: '',
        imageUrl: ''
      },

      rules: {
        name: [{
          required: true,
          message: "El campo es requerido",
        }],
        lastName: [{
          required: true,
          message: "El campo es requerido",
        }],
        lastNameAditional: [{
          required: true,
          message: "El campo es requerido",
        }],
        districtId: [{
          required: true,
          message: "El campo es requerido",
        }],
      }
    };
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
      regions: state => state.regions.regions,
      loadingRegions: state => state.regions.loadingRegions,
      provinces: state => state.regions.provinces,
      loadingProvinces: state => state.regions.loadingProvinces,
      districts: state => state.regions.districts,
      loadingDistricts: state => state.regions.loadingDistricts
    })
  },
  
  created () {
    this.getRegions()
    this.getProfile()
  },

  methods: {
    ...mapActions({
      getUser: 'users/getUser',
      getRegions: "regions/getRegions",
      getProvinces: "regions/getProvinces",
      getDistricts: "regions/getDistricts",
    }),

    getProfile () {
      new Promise((resolve, reject) => {
        this.$userAPI.getProfile()
          .then(response => {
            const { data } = response.data
            this.setFormField(data)
            resolve(response);
          })
          .catch(error => reject(error));
      });
    },

    setFormField (data) {
      this.profile = data
      this.profile.email = this.user.email

      this.form.name = data.name
      this.form.lastName = data.lastName
      this.form.lastNameAditional = data.lastNameAditional
      this.form.status = data.status
      this.form.districtId = data.districtId

      this.form.institute = data.institute
      this.form.subject = data.subject
      this.imageUrl = data.image

      this.getProvinces({ params: { id: data.regionId } });
      this.getDistricts({ params: { id: data.provinceId } });
    },

    submitForm (e) {
      e.preventDefault();
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true
          this.modifyProfile().then(response => {
            this.getProfile()
          })
        }
      });
    },

    modifyProfile () {
      const data = new FormData()
      let keys = Object.keys(this.form);
      keys.forEach(val => {
        data.append(val, this.form[val]);
      });

      return new Promise((resolve, reject) => {
        this.$userAPI
          .putProfile({ data })
          .then(response => {
            this.processingForm = false
            this.$toast.success(`Su perfil ha sido actualizado con éxito`)

            resolve(response);
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          });
      });
    },

    launchUploadAvatar (option) {
      this.imageUrl = URL.createObjectURL(option.file);
      this.form.imageUrl = option.file;
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
    }
  }
};
</script>
