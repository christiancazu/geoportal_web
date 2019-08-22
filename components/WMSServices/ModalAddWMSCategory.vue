<template>
  <BaseModal
    title="Registrar Categoría WMS"
    :show-modal="showModalAddWMSCategory"
    :append-to-body="true"
    @action-modal="replaceShowModalAddWMSCategory"
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
        :disabled="processingForm"
        @submit.prevent="submitFormWMSCategory"
      >
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
        :disabled="processingForm"
        @click="replaceShowModalAddWMSCategory({ show: false })"
      >CANCELAR</el-button>
      <el-button
        size="small"
        native-type="submit"
        type="primary"
        :loading="processingForm"
        @click.prevent="submitFormWMSCategory"
      >GUARDAR</el-button>
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

  data () {
    return {
      processingForm: false,
      form: {
        name: "",
        description: "",
      },

      rules: {
        name: [{
          required: true,
          message: "El nombre es requerido"
        }]
      }
    };
  },

  computed: {
    ...mapState({
      showModalAddWMSCategory: state => state.modalsWMSServices.showModalAddWMSCategory
    })
  },

  methods: {
    ...mapActions({
      getWMSCategories: "WMSCategories/getWMSCategories",
      replaceShowModalAddWMSCategory:
        "modalsWMSServices/replaceShowModalAddWMSCategory"
    }),

    submitFormWMSCategory () {
      this.$refs.formWMSCategory.validate(valid => {
        if (valid) {
          this.processingForm = true
          this.createWMSCategory().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.formWMSCategory.resetFields();
              this.replaceShowModalAddWMSCategory({ show: false });
              this.getWMSCategories();
              this.$toast.success(`La categoría se registro con éxito`)
            }
          });
        }
      });
    },

    createWMSCategory () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        formData.append(val, this.form[val]);
      });

      return new Promise((resolve, reject) => {
        this.$WMSCategoryAPI
          .create({ data: formData })
          .then(response => {
            this.processingForm = false
            resolve(response);
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          });
      });
    }
  }
};
</script>
<style lang="scss">
</style>
