<template>
  <BaseModal
    title="Agregar Autor"
    name-state="modalAddWMSAuthor"
    :show-modal="modalAddWMSAuthor"
    :append-to-body="true"
  >
    <template v-slot:content>
      <el-form
        ref="modal"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :disabled="processingFormWMSAuthor"
      >
        <!-- name -->
        <el-form-item label="Nombre" prop="name">
          <el-input v-model="form.name" type="text" autocomplete="off" />
        </el-form-item>

        <!-- weburl -->
        <el-form-item label="URL" prop="webUrl">
          <el-input v-model="form.webUrl" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Descripción" prop="description">
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
        :disabled="processingFormWMSAuthor"
        @click="$_modalVisibilityMixin_close('modalAddWMSAuthor')"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="processingFormWMSAuthor"
        @click.prevent="submitFormWMSAuthor"
      >GUARDAR</el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";
import { SUCCESS } from "@/config/messages";

export default {
  components: {
    BaseModal
  },

  data() {
    return {
      processingFormWMSAuthor: false,
      form: {
        name: "",
        description: "",
        webUrl: "",
        isPublic: "True"
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
    ...mapState("modalsVisibilities", {
      modalAddWMSAuthor: state => state.modalAddWMSAuthor
    })
  },

  methods: {
    ...mapActions({
      getWMSAuthors: "WMSAuthors/getWMSAuthors"
    }),

    async submitFormWMSAuthor() {
      let isFormValid = false;
      await this.$refs.modal.validate(result => (isFormValid = result));

      if (isFormValid) {
        // #TODO REFACTORED TO ACTION STORE

        this.processingFormWMSAuthor = true;
        this.createWMSAuthor().then(response => {
          this.$refs.modal.resetFields();
          this.getWMSAuthors();
          this.$toast.success(SUCCESS.AUTHOR.REGISTERED);
        });
      }
    },

    createWMSAuthor() {
      const formData = new FormData();

      Object.keys(this.form).forEach(val => {
        formData.append(val, this.form[val]);
      });

      return new Promise((resolve, reject) => {
        this.$WMSAuthorAPI
          .create({ data: formData })
          .then(response => {
            this.processingFormWMSAuthor = false;
            resolve(response);
          })
          .catch(error => {
            this.processingFormWMSAuthor = false;
            reject(error);
          });
      });
    }
  }
};
</script>
<style lang="scss">
</style>
