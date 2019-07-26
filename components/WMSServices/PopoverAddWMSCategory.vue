<template>
  <BaseModal
    title="Registrar Servicios WMS"
    :show-modal="showModalAddWMSCategory"
    :append-to-body="true"
  >
    <template v-slot:content>
      <el-form
        ref="formWMSCategory"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        @submit.prevent="submitFormWMSCategory"
      >
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
        <!-- name -->
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="form.name" type="text" autocomplete="off" />
        </el-form-item>

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
      <el-button @click="replaceShowModalAddWMSCategory({ show: false })">Cancel</el-button>
      <el-button
        native-type="submit"
        type="primary"
        @click.prevent="submitFormWMSCategory"
      >Registrar</el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";

import BasePopover from "@/components/base/BasePopover.vue";
export default {
  components: {
    BaseModal,
    BasePopover
  },

  data() {
    return {
      imageSelected: "",
      form: {
        name: "",
        description: "",
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
    showModalAddWMSCategory: {
      get() {
        return this.$store.state.modalsWMSServices.showModalAddWMSCategory;
      },
      set(value) {
        this.replaceShowModalAddWMSCategory({ show: value });
      }
    }
  },

  methods: {
    ...mapActions({
      getWMSCategories: "WMSCategories/getWMSCategories",
      replaceShowModalAddWMSCategory:
        "modalsWMSServices/replaceShowModalAddWMSCategory"
    }),

    submitFormWMSCategory() {
      this.$refs.formWMSCategory.validate(valid => {
        if (valid) {
          this.createWMSCategory().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.formWMSCategory.resetFields();
              this.getWMSCategories();
            }
          });
        }
      });
    },

    createWMSCategory() {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        formData.append(val, this.form[val]);
      });

      return new Promise((resolve, reject) => {
        this.$WMSCategoryAPI
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
