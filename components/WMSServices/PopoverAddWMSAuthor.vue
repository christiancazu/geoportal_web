<template>
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
        <el-form-item label="Imagen" class="text-xs-center">
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
      <el-col :md="14">
        <!-- name -->
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="form.name" type="text" autocomplete="off" />
        </el-form-item>

        <!-- weburl -->
        <el-form-item label="URL">
          <el-input v-model="form.webUrl" type="text" autocomplete="off" />
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

    <el-form-item class="text-xs-right mb-0">
      <el-button>Cancel</el-button>
      <el-button
        native-type="submit"
        type="primary"
        @click.prevent="submitFormWMSAuthor"
      >Registrarse</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
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

  methods: {
    ...mapActions({
      getWMSAuthors: "WMSAuthor/getWMSAuthors"
    }),

    submitFormWMSAuthor() {
      this.$refs.formWMSAuthor.validate(valid => {
        if (valid) {
          this.createWMSAuthor().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.formWMSAuthor.resetFields();
              this.getWMSAuthors();
            }
          });
        }
      });
    },

    createWMSAuthor() {
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
    }
  }
};
</script>
<style lang="scss">
</style>
