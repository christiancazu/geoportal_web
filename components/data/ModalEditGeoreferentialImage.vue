-<template>
  <BaseModal
    title="Modificar datos de la imagen Georeferenciada"
    name-state="modalEditGeoreferentialImage"
    :show-modal="modalEditGeoreferentialImage"
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
      >
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
        <!-- name -->
        <el-form-item
          label="Nombre"
          prop="name"
        >
          <el-input
            v-model="form.name"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <!-- instituto -->
        <el-form-item
          label="Institución"
          prop="institute"
        >
          <el-input
            v-model="form.institute"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <!-- objetivo -->
        <el-form-item
          label="Descripción"
          prop="subject"
        >
          <el-input
            v-model="form.subject"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        class="ma-2"
        :disabled="processingForm"
        size="small"
        @click="$_modalVisibilityMixin_close('modalEditGeoreferentialImage')"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        class="ma-2"
        native-type="submit"
        size="small"
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
      provinceId: 0,
      regionId: 0,
      processingForm: false,
      form: {
        userTypeId: '',
        districtId: '',
        name: '',
        lastName: '',
        lastNameAditional: '',
        uploadImage: '',
        status: 'AC'
      },

      rules: {
        name: [{
          required: true,
          message: "El nombre es requerido"
        }],
        lastName: [{
          required: true,
          message: "El nombre es requerido"
        }],
        districtId: [{
          required: true,
          message: "El campo es requerido",
        }],
      }
    };
  },

  watch: {
    modalEditGeoreferentialImage: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields()
        this.imageSelected = ""
        this.replaceUser({ user: null })
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
      loadingDistricts: state => state.regions.loadingDistricts,
      modalEditGeoreferentialImage: state => state.modalsVisibilities.modalEditGeoreferentialImage
    })
  },

  methods: {
    ...mapActions({
      getRegions: "regions/getRegions",
      getProvinces: "regions/getProvinces",
      getDistricts: "regions/getDistricts",
      replaceProvinces: "regions/replaceProvinces",
      replaceDistricts: "regions/replaceDistricts",
      getUsers: "users/getUsers",
      getUser: "users/getUser",
      replaceUser: "users/replaceUser"
    }),

    setFormField () {
      this.form.userTypeId = this.user.userTypeId
      this.form.districtId = this.user.districtId || ''
      this.form.name = this.user.name
      this.form.lastName = this.user.lastName
      this.form.lastNameAditional = this.user.lastNameAditional
      this.imageSelected = this.user.image
      this.form.status = this.user.status

      this.provinceId = this.user.provinceId || ''
      this.regionId = this.user.regionId || ''

      this.getProvinces({ params: { id: this.user.regionId } });
      this.getDistricts({ params: { id: this.user.provinceId } });
    },

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true
          this.updateUser()
        }
      });
    },

    updateUser () {
      const data = new FormData()
      let keys = Object.keys(this.form);
      keys.forEach(val => {
        data.append(val, this.form[val]);
      });
      const id = this.user.id

      return new Promise((resolve, reject) => {
        this.$userAPI
          .update({ data, id })
          .then(response => {
            this.processingForm = false
            if (response.data.status) {
              this.$refs.form.resetFields();
              this.$_modalVisibilityMixin_close('odalEditGeoreferentialImage')
              this.getUsers()
              this.$toast.success(`El usuario ha sido actualizado con éxito`)
            } else {
              this.getUser({ id: this.user.id })
                .then(response => {
                  this.setFormField()
                })
            }
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

    onChangeRegion (regionId) {
      this.provinceId = ''
      this.$refs.districtId.resetField()
      this.form.districtId = ''
      this.replaceDistricts({ districts: null });
      this.getProvinces({ params: { id: regionId } });
    },

    onChangeProvince (provinceId) {
      this.$refs.districtId.resetField()
      this.form.districtId = ''
      this.getDistricts({ params: { id: provinceId } });
    }
  }
};
</script>
<style lang="scss">
.label-success {
  .el-switch__label.is-active {
    color: #67c23a;
  }
}
</style>
