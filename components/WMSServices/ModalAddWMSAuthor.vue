<template>
  <BaseModal
    title="Agregar Autor"
    :show-modal="showModalAddWMSAuthor"
    :append-to-body="true"
    @action-modal="replaceShowModalAddWMSAuthor"
  >
    <template v-slot:content>
      <el-form
        ref="formWMSAuthor"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        @submit.prevent="submitFormWMSAuthor"
      >
        <el-row :gutter="10">
          <el-col :md="10">
            <!-- image -->
            <el-form-item
              label="Imagen"
              class="text-xs-center"
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
          <el-col :md="14">
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

            <!-- weburl -->
            <el-form-item label="URL">
              <el-input
                v-model="form.webUrl"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Descripción">
          <el-input
            v-model="form.description"
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
        @click="replaceShowModalAddWMSAuthor({ show: false })"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        @click.prevent="submitFormWMSAuthor"
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
      form: {
        name: "",
        description: "",
        webUrl: "",
        image: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "El nombre es requerido"
          }
        ]
      }
    };
  },

  computed: {
    showModalAddWMSAuthor: {
      get () {
        return this.$store.state.modalsWMSServices.showModalAddWMSAuthor;
      },
      set (value) {
        this.replaceShowModalAddWMSAuthor({ show: value });
      }
    }
  },

  methods: {
    ...mapActions({
      getWMSAuthors: "WMSAuthors/getWMSAuthors",
      replaceShowModalAddWMSAuthor:
        "modalsWMSServices/replaceShowModalAddWMSAuthor"
    }),

    submitFormWMSAuthor () {
      this.$refs.formWMSAuthor.validate(valid => {
        if (valid) {
          this.createWMSAuthor().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.formWMSAuthor.resetFields();
              this.replaceShowModalAddWMSAuthor({ show: false });
              this.getWMSAuthors();
            }
          });
        }
      });
    },

    createWMSAuthor () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        formData.append(val, this.form[val]);
      });

      return new Promise((resolve, reject) => {
        this.$WMSAuthorAPI
          .create({ data: formData })
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
<style lang="scss">
</style>
