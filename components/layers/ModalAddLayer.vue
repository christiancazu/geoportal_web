<template>
  <BaseModal
    title="Registrar nueva capa"
    :show-modal="showModalAddLayer"
    @action-modal="replaceShowModalAddLayer"
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
        <el-row
          :gutter="10"
          align="bottom"
          justify="center"
        >
          <el-col :md="12">
            <!-- file -->
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
            <!-- title -->
            <el-form-item
              label="Título"
              prop="title"
            >
              <el-input
                v-model="form.title"
                type="text"
                autocomplete="off"
              />
            </el-form-item>

            <!-- name -->
            <el-form-item
              label="Nombre de Capa"
              prop="name"
            >
              <el-input
                v-model="form.name"
                type="text"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :md="12">
            <!-- password_1 -->
            <el-form-item
              label="contraseña"
              prop="password"
            >
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
            <el-form-item
              label="Confirmar contraseña"
              prop="passwordConfirmation"
            >
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
              class="pl-4"
              label="Privilegio"
            >
              <el-switch
                class="text-xs-center"
                style="display: block"
                v-model="form.type"
                inactive-color="#6376f7"
                active-color="#6376f7"
                inactive-text="ADMINISTRADOR"
                active-text="USUARIO"
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
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        size="small"
        @click="replaceShowModalAddLayer({ show: false })"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        @click.prevent="submitForm"
      >GUARDAR CAPA</el-button>
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
      processingForm: false,
      imageSelected: "",
      showFormStyle: false,
      form: {
        title: "",
        name: "",
        file: "",
        description: null,
        nameStyle: "",
        fileStyle: "",
        description: "",
      },

      rules: {
        title: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        name: [{
          required: true,
          message: "El nombre es requerido"
        }],
        nameStyle: [{
          required: true,
          message: "El nombre es requerido"
        }],
      }
    };
  },

  computed: {
    ...mapState({
    }),

    showModalAddLayer: {
      get () {
        return this.$store.state.modalsManagementLayer.showModalAddLayer;
      },
      set (value) {
        this.replaceShowModalAddLayer({ show: value });
      }
    }
  },

  watch: {
    showModalAddLayer: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        return false;
      }
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalAddLayer: "modalsManagementLayer/replaceShowModalAddLayer",
      getLayers: "layers/getLayers"
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.createLayer().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.form.resetFields();
              this.replaceShowModalAddLayer({ show: false });
              this.getLayers();
            }
          });
        }
      });
    },

    createLayer () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        formData.append(val, this.form[val]);
      });

      const data = formData;

      return new Promise((resolve, reject) => {
        this.$layerAPI
          .create({ data })
          .then(response => {
            resolve(response);
          })
          .catch(error => reject(error));
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
    }
  }
};
</script>
