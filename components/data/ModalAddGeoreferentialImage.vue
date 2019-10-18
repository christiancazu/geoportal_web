<template>
  <BaseModal
    title="Registrar nueva imagen georeferencial"
    name-state="modalAddGeoreferentialImage"
    :show-modal="modalAddGeoreferentialImage"
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
        size="small"
        :disabled="processingForm"
        @click="$_modalVisibilityMixin_close('modalAddGeoreferentialImage')"
      >CANCELAR</el-button>
      <el-button
        class="ma-2"
        size="small"
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
    modalAddGeoreferentialImage: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        this.imageSelected = "";
        return false;
      }
      this.getRegions();
    }
  },

  computed: {
    ...mapState({
      regions: state => state.regions.regions,
      loadingRegions: state => state.regions.loadingRegions,
      provinces: state => state.regions.provinces,
      loadingProvinces: state => state.regions.loadingProvinces,
      districts: state => state.regions.districts,
      loadingDistricts: state => state.regions.loadingDistricts,
      modalAddGeoreferentialImage: state =>
        state.modalsVisibilities.modalAddGeoreferentialImage
    })
  },

  methods: {
    ...mapActions({
      getRegions: "regions/getRegions",
      getProvinces: "regions/getProvinces",
      getDistricts: "regions/getDistricts",
      replaceProvinces: "regions/replaceProvinces",
      replaceDistricts: "regions/replaceDistricts",
      getUsers: "users/getUsers"
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true;
          this.createUser().then(response => {
            this.$_modalVisibilityMixin_close("modalAddGeoreferentialImage");
            this.$toast.success(`El usuario se registro con éxito`);
            this.getUsers();
          });
        }
      });
    },

    createUser () {
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
            this.processingForm = false;
            resolve(response);
          })
          .catch(error => {
            this.processingForm = false;
            reject(error);
          });
      });
    },

    launchUploadAvatar (option) {
      this.imageSelected = URL.createObjectURL(option.file);
      this.form.image = option.file;
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

    onchangeRegions (region) {
      const params = {
        id: region.id
      };
      this.replaceProvinces({ provinces: null });
      this.replaceDistricts({ districts: null });
      this.$refs.province.resetField();
      this.$refs.districtId.resetField();

      this.getProvinces({ params });
    },

    onchangeProvinces (province) {
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
