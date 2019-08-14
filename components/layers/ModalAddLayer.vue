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
                :rules="rules.title"
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
                :rules="rules.name"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- Descripción -->
        <el-form-item
          label="Descripción"
          prop="description"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>

        <el-checkbox
          class="font-weight-bold mb-2"
          v-model="showFormStyle"
        >Agregar Style</el-checkbox>
        <div v-show="showFormStyle">
          <div class="my-3 py-2">
            <el-divider content-position="left">
              <strong>Agregar Style</strong>
            </el-divider>
          </div>
          <!-- add style -->
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
              <!-- nameStyle -->
              <el-form-item
                label="Nombre"
                prop="nameStyle"
              >
                <el-input
                  v-model="form.nameStyle"
                  type="text"
                  autocomplete="off"
                  :rules="rules.nameStyle"
                />
              </el-form-item>

              <!-- descriptionStyle -->
              <el-form-item
                label="Descripción"
                prop="descriptionStyle"
              >
                <el-input
                  v-model="form.descriptionStyle"
                  type="textarea"
                  :rows="3"
                  autocomplete="off"
                  :maxlength="300"
                  :show-word-limit="true"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
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
        descriptionStyle: "",
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
